import pytest
import pandas as pd
from app import app
from api.api import api
from utils.data_utils import get_stock_data
from models.forecast_model import forecast_stock

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_recommend_endpoint(client):
    tickers = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA']  # 5 stocks to test

    for ticker in tickers:
        response = client.get(f'/api/recommend/{ticker}')
        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True
        assert 'recommendation' in data['data']
        assert 'current_price' in data['data']
        assert 'percentage_change' in data['data']
        assert 'sentiment' in data['data']
        assert 'forecast' in data['data']
        assert isinstance(data['data']['forecast'], list)

def test_forecast_endpoint(client):
    tickers = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA']

    for ticker in tickers:
        response = client.get(f'/api/forecast/{ticker}')
        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True
        assert 'forecast' in data['data']
        assert isinstance(data['data']['forecast'], list)

def test_sentiment_endpoint(client):
    texts = ["The company reported strong earnings.", "The stock price dropped significantly.", "The market is volatile."]

    for text in texts:
        response = client.get(f'/api/sentiment/{text}')
        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True
        assert 'Analyzed Sentiment' in data['data']

def test_percentage_endpoint(client):
    tickers = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA']

    for ticker in tickers:
        response = client.get(f'/api/percentage/{ticker}')
        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True
        assert 'percentage_change' in data['data']

def test_forecast_model():
    tickers = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA']

    for ticker in tickers:
        data = get_stock_data(ticker)
        if data is not None and not data.empty:
            forecast = forecast_stock(data)
            assert isinstance(forecast, pd.DataFrame)
            assert not forecast.empty
            assert 'ds' in forecast.columns
            assert 'yhat' in forecast.columns
            assert 'yhat_lower' in forecast.columns
            assert 'yhat_upper' in forecast.columns