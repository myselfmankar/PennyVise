import google.generativeai as genai
import yfinance as yf
from config import Config

genai.configure(api_key=Config.GEMINI_API_KEY) 
model = genai.GenerativeModel('gemini-1.5-flash')

def get_news_sentiment(ticker: str) -> dict:
    """
    Uses Gemini API to fetch and analyze news sentiment.
    """
    try:
        stock = yf.Ticker(ticker)
        company_name = stock.info.get('longName', ticker)

        if not company_name:
            return {"error": f"Could not retrieve company name for ticker: {ticker}"}

        prompt = f"Summarize recent financial news articles about {company_name} ({ticker}) and provide a sentiment analysis with reasoning."

        response = model.generate_content(prompt)

        if response and response.text:
            return {"gemini_response": response.text}
        else:
            return {"error": "Gemini API failed to provide a response."}

    except Exception as e:
        return {"error": f"An error occurred: {e}"}


def analyze_sentiment(text: str) -> dict:
    try:
        prompt = f"Analyze the sentiment of the following text: {text}"
        response = model.generate_content(prompt)

        if response and response.text:
            return {"sentiment": response.text}
        else:
            return {"error": "Gemini API failed to provide a sentiment."}

    except Exception as e:
        return {"error": f"An error occurred: {e}"}
