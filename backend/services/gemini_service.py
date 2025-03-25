import google.generativeai as genai
import yfinance as yf
from ..config import Config

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

        prompt = f"Summarize recent financial news articles about {company_name} ({ticker})."

        response = model.generate_content(prompt)

        if response and response.text:
            return {"news_summary": response.text}
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


def getNewsAndPrediction(prompt: str) -> str:
    """
    Uses Gemini API to analyze stocks or provide investment advice.
    """
    try:
        response = model.generate_content(prompt)
        if response and response.text:
            return {"response_text": response.text}
        else:
            return "Sorry, I couldn't generate a response at this time."
    except Exception as e:
        return f"An error occurred: {e}"


def get_gemini_answer(message: str) -> dict:
    # Updated to always return a dict with response_text
    try:
        response = model.generate_content(message)
        if response and response.text:
            return {"response_text": response.text}
        return {"response_text": "Sorry, I couldn't generate a response at this time."}
    except Exception as e:
        return {"response_text": f"An error occurred: {e}"}
