import React from 'react';
import ReactMarkdown from 'react-markdown';
import Loader from '../../../components/Loader';
import { useStocks } from '../../../context/StocksContext';

const StockInfo = ({ data = {} }) => {
  const { loading, stockData } = useStocks();
  
  if (loading) {
    return <Loader />;
  }

  const { 
    recommendation = '-', 
    current_price = 0, 
    percentage_change = 0, 
    sentiment = { gemini_response: '' },
    ticker = '', 
    predicted_price = stockData?.predicted_price || 0, // use predicted price from context
    predicted_date = stockData?.predicted_date || '' // use predicted date from context
  } = data;

  // New: Trim extra spaces from each line in the markdown text
  const trimmedNews = sentiment?.news_summary
    ? sentiment.news_summary
        .split('\n')
        .map(line => line.trim())
        .join('\n')
    : '';

  // Format predicted date
  const formattedPredictedDate = predicted_date ? new Date(predicted_date).toLocaleDateString() : '-';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <h3 className="text-xl font-bold mb-4 text-gray-200">Market Data</h3>
        <div className="space-y-3">
          {/* Current Price */}
          <div className="flex justify-between text-lg">
            <span className="text-gray-400">Current Price:</span>
            <span className="font-semibold text-gray-200">
              {current_price ? `$${current_price.toFixed(2)}` : '-'}
            </span>
          </div>
          {/* Percentage Change */}
          <div className="flex justify-between text-lg font-bold">
            <span className="text-gray-400">Change:</span>
            <span className={`${percentage_change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {percentage_change ? `${percentage_change >= 0 ? '+' : ''}${percentage_change.toFixed(2)}%` : '-'}
            </span>
          </div>
          {/* Recommendation */}
          <div className="flex justify-between text-xl font-bold">
            <span className="text-gray-400">Recommendation:</span>
            <span className={`${recommendation === 'Buy' ? 'text-green-400' : recommendation === 'Sell' ? 'text-red-400' : 'text-gray-400'}`}>
              {recommendation}
            </span>
          </div>
          {/* Predicted Price */}
          <div className="flex justify-between text-lg">
            <span className="text-gray-400">Predicted Price:</span>
            <span className="font-semibold text-gray-200">
              {predicted_price ? `$${predicted_price.toFixed(2)}` : '-'}
            </span>
          </div>
          {/* Predicted Date */}
          <div className="flex justify-between text-lg">
            <span className="text-gray-400">Predicted Date:</span>
            <span className="font-semibold text-gray-200">
              {formattedPredictedDate}
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <h3 className="text-xl font-bold mb-4 text-gray-200">News related to {ticker}</h3>
        <div className="prose prose-sm max-w-none text-white prose-headings:text-white prose-a:text-blue-400 prose-strong:text-white">
          {trimmedNews ? (
            <ReactMarkdown>
              {trimmedNews}
            </ReactMarkdown>
          ) : (
            <p>No news data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockInfo;
