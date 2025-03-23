from flask import jsonify, Blueprint
from utils.data_utils import get_stock_data, calculate_sma, calculate_daily_percentage_change
from models.forecast_model import forecast_stock
from services.gemini_service import get_news_sentiment, analyze_sentiment
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
    recommendation = "Buy" if current_price > last_sma else "Sell"
    percentage_change = calculate_daily_percentage_change(data).round(2).iloc[-1]
    sentiment = get_news_sentiment(ticker)
    forecast_data = forecast_stock(data)
    forecast_list = forecast_data[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].round(2).tail().to_dict(orient='records')

    response_data = {
        "recommendation": recommendation,
        "current_price": current_price,
        "percentage_change": percentage_change,
        "sentiment": sentiment,
        "forecast": forecast_list
    }
    return create_response(success=True, data=response_data)

@api.route('/forecast/<ticker>')
def forecast(ticker):
    data = get_stock_data(ticker)
    if data is None or data.empty:
        return create_response(success=False, error="Could not fetch data")
    forecast_data = forecast_stock(data)
    forecast_list = forecast_data[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail().to_dict(orient='records')
    return create_response(success=True, data={"forecast": forecast_list})

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