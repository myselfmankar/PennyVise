import axios from 'axios';

const api = axios.create({
  baseURL: "https://pennyvise-backend-6d4w.onrender.com/api"
});

export const getStockRecommendation = async (ticker) => {
  const response = await api.get(`/recommend/${ticker}`);
  return response.data;
};

export const getStockForecast = async (ticker) => {
  const response = await api.get(`/forecast/${ticker}`);
  return response.data;
};

export const getStockPercentage = async (ticker) => {
  const response = await api.get(`/percentage/${ticker}`);
  return response.data;
};

// New function to get investment recommendations
export const getInvestmentRecommendations = async (query) => {
  const response = await api.post('/invest', { amount: query });
  return response.data;
};
