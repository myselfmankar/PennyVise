import yfinance as yf
import pandas as pd

def get_stock_data(ticker: str, period: str = "30d") -> pd.DataFrame:
    try:
        stock = yf.Ticker(ticker)
        history = stock.history(period=period)

        if history.empty:
            raise ValueError(f"No data found for ticker: {ticker}")

        return history

    except Exception as e:
        print(f"Error fetching data: {e}")
        return pd.DataFrame()

def calculate_sma(data: pd.DataFrame, window: int = 20) -> pd.Series:
    try:
        if data.empty:
            raise ValueError("Input DataFrame is empty.")
        return data['Close'].rolling(window=window).mean()
    except Exception as e:
        print(f"Error calculating SMA: {e}")
        return pd.Series()

def calculate_daily_percentage_change(data: pd.DataFrame) -> pd.Series:
    try:
        if data.empty:
            raise ValueError("Input DataFrame is empty.")
        return data['Close'].pct_change() * 100
    except Exception as e:
        print(f"Error calculating percentage change: {e}")
        return pd.Series()