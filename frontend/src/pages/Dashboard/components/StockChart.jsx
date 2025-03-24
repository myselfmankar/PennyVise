import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../../../components/Loader';
import { useStocks } from '../../../context/StocksContext';

const StockChart = ({ data = [] }) => {
  const { loading } = useStocks();

  if (loading) {
    return <Loader />;
  }

  const formattedData = (data || []).map(item => ({
    date: new Date(item?.ds || new Date()).toLocaleDateString(),
    actual: parseFloat(item?.y || 0).toFixed(2),
    predicted: parseFloat(item?.yhat || 0).toFixed(2),
    upper: parseFloat(item?.yhat_upper || 0).toFixed(2),
    lower: parseFloat(item?.yhat_lower || 0).toFixed(2)
  }));

  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <h2 className="text-xl font-bold mb-6 text-gray-200">Stock Price Forecast</h2>
        <div className="w-full h-[500px] flex items-center justify-center text-gray-400">
          No forecast data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
      <h2 className="text-xl font-bold mb-6 text-gray-200">Stock Price Forecast</h2>
      <div className="w-full h-[500px]">
        <ResponsiveContainer>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" tick={{ fill: '#9CA3AF' }} />
            <YAxis tick={{ fill: '#9CA3AF' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', borderRadius: '8px', border: '1px solid #374151' }}
              labelStyle={{ color: '#E5E7EB' }}
              itemStyle={{ color: '#E5E7EB' }}
              formatter={(value) => [`$${value}`, '']}
            />
            <Legend wrapperStyle={{ paddingTop: '20px', color: '#E5E7EB' }} />
            <Line type="monotone" dataKey="actual" stroke="#818CF8" strokeWidth={2} name="Actual" dot={false} />
            <Line type="monotone" dataKey="predicted" stroke="#34D399" strokeWidth={2} name="Predicted" dot={false} />
            <Line type="monotone" dataKey="upper" stroke="#4B5563" strokeDasharray="5 5" name="Upper Bound" dot={false} />
            <Line type="monotone" dataKey="lower" stroke="#4B5563" strokeDasharray="5 5" name="Lower Bound" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;
