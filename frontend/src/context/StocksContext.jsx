import React, { createContext, useState, useContext } from 'react';
import { getStockRecommendation, getStockForecast, getStockPercentage } from '../services/api';

const StocksContext = createContext();

export const StocksProvider = ({ children }) => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async (ticker) => {
    setLoading(true);
    try {
      const [recommendation, forecast, percentage] = await Promise.all([
        getStockRecommendation(ticker),
        getStockForecast(ticker),
        getStockPercentage(ticker)
      ]);
      
      setStockData({
        recommendation: recommendation.data,
        forecast: forecast.data.forecast,
        percentage: percentage.data.percentage_change,
        predicted_price: forecast.data.predicted_price, 
        predicted_date: new Date(forecast.data.predicted_date).toISOString().split('T')[0]  // Format to only display the date part
      });
      setSelectedStock(ticker);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StocksContext.Provider value={{
      selectedStock,
      stockData,
      loading,
      error,
      fetchStockData
    }}>
      {children}
    </StocksContext.Provider>
  );
};

export const useStocks = () => useContext(StocksContext);
