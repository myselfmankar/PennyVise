from flask import jsonify, Blueprint, request
from utils.data_utils import get_stock_data, calculate_sma, calculate_daily_percentage_change
from models.forecast_model import forecast_stock
from services.gemini_service import get_news_sentiment, analyze_sentiment, get_gemini_answer
from services.investment_service import get_investment_recommendations 
import pandas as pd

api = Blueprint('api', __name__)

def create_response(success: bool, data: dict = None, error: str = None) -> jsonify:
    """
    Creates a standardized JSON response.
    """
    response = {
        "success": success,
        "data": data,
        "error": error
    }
    return jsonify(response)

@api.route('/recommend/<ticker>')
def recommend(ticker):
    data = get_stock_data(ticker)
    if data is None or data.empty:
        return create_response(success=False, error="Could not fetch data")

    sma = calculate_sma(data)
    current_price = data['Close'].iloc[-1]
    last_sma = sma.iloc[-1]
    # New logic: include 'Hold' recommendation if the price is within 5% of the SMA.
    threshold = current_price * 0.05
    if abs(current_price - last_sma) <= threshold:
        recommendation = "Hold"
    elif current_price > last_sma:
        recommendation = "Buy"
    else:
        recommendation = "Sell"
    percentage_change = calculate_daily_percentage_change(data).round(2).iloc[-1]
    sentiment = get_news_sentiment(ticker)
    forecast_data, predicted_price, predicted_date = forecast_stock(data)
    forecast_list = forecast_data[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].round(2).tail().to_dict(orient='records')

    response_data = {
        "recommendation": recommendation,
        "current_price": current_price,
        "percentage_change": percentage_change,
        "sentiment": sentiment,
        "forecast": forecast_list,
        "predicted_price": predicted_price,
        "predicted_date": predicted_date.strftime('%Y-%m-%d')  # Format to only display the date part
    }
    return create_response(success=True, data=response_data)

@api.route('/forecast/<ticker>')
def forecast(ticker):
    data = get_stock_data(ticker)
    if data is None or data.empty:
        return create_response(success=False, error="Could not fetch data")
    forecast_data, predicted_price, predicted_date = forecast_stock(data)
    forecast_list = forecast_data[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail().to_dict(orient='records')
    return create_response(success=True, data={"forecast": forecast_list, "predicted_price": predicted_price, "predicted_date": predicted_date.strftime('%Y-%m-%d')})

@api.route('/sentiment/<text>')
def sentiment(text):
    response = analyze_sentiment(text=text)
    if "error" in response:
        return create_response(success=False, error=response["error"])
    return create_response(success=True, data={'Analyzed Sentiment': response})

@api.route('/percentage/<ticker>')
def percentage(ticker):
    data = get_stock_data(ticker)
    if data is None or data.empty:
        return create_response(success=False, error="Could not fetch data")
    percentage = calculate_daily_percentage_change(data).round(2).iloc[-1]
    return create_response(success=True, data={"percentage_change": percentage})

@api.route('/invest', methods=['POST'])
def invest():
    data = request.json
    amount = data.get('amount')
    if not amount:
        return create_response(success=False, error="Amount is required")

    recommendations = get_investment_recommendations(amount)
    return create_response(success=True, data={"recommendations": recommendations})

@api.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    message = data.get('message', '')
    if not message.strip():
        return create_response(success=False, error="Message is required"), 400
    try:
        answer = get_gemini_answer(message)
        # Add fallback if the answer is empty
        if not answer:
            answer = "Sorry, I couldn't generate a response."
        return create_response(success=True, data={'response': answer})
    except Exception as e:
        return create_response(success=False, error=str(e)), 500