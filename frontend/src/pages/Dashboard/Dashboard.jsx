import React, { useEffect } from 'react';
import { useStocks } from '../../context/StocksContext';
import Loader from '../../components/Loader';
import StockChart from './components/StockChart';
import StockInfo from './components/StockInfo';
import StockSelector from './components/StockSelector';
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";

const Dashboard = () => {
  const { selectedStock, stockData, loading, error, fetchStockData } = useStocks();
  const defaultStocks = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA'];

  useEffect(() => {
    if (!selectedStock) {
      fetchStockData(defaultStocks[0]);
    }
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h1>Stock Analysis Dashboard</h1>
          </header>
          <StockSelector stocks={defaultStocks} />
          <div className={styles.dataSection}>
            <StockInfo data={stockData?.recommendation || {}} />
            <StockChart data={stockData?.forecast || []} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
