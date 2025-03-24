import React from 'react';
import { useStocks } from '../../../context/StocksContext';

const StockSelector = ({ stocks }) => {
  const { selectedStock, fetchStockData } = useStocks();

  return (
    <div className="flex items-center gap-4 mb-8 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
      <label htmlFor="stock-select" className="font-semibold text-gray-200">
        Select Stock:
      </label>
      <select
        id="stock-select"
        value={selectedStock || ''}
        onChange={(e) => fetchStockData(e.target.value)}
        className="p-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg min-w-[200px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      >
        {stocks.map((stock) => (
          <option key={stock} value={stock}>
            {stock}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StockSelector;
