"use client";
import { useState } from "react";
import { Stock } from "./models/stock.model";
import StockCard from "./StockCard";
import styles from "./StocksPane.module.scss";
import { ResponseObject } from "../core/models/response-object.model";
import Spinner from "../shared/Spinner";

interface StocksPaneProps {
  stocks: Stock[];
}

export default function StocksPane({ stocks }: StocksPaneProps) {
  const [stocksList, setStocks] = useState<Stock[]>(stocks);
  const [loading, setLoading] = useState(false);

  async function onDeleteStock(symbol: string) {
    if (!confirm(`Are you sure you want to delete stock ${symbol}?`)) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_URI}/stocks/${symbol}`, {
          method: 'DELETE',
        }
      );
      const parsed: ResponseObject = await response.json();

      if (response.ok && parsed.data) {
        const newStockList = stocksList.filter(
          (stock: Stock) => stock.symbol !== symbol
        );
        setStocks(newStockList);
        setLoading(false);
      } else {
        throw new Error(`Failed to delete stock: ${symbol}`);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error deleting stock:', error);
      alert('An error occurred while deleting the stock, please check the log.');
    }
  }

  return (
    <div
      className={`basis-full md:basis-3/4 p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 place-content-start ${styles.container}`}
    >
      {Array.isArray(stocksList) &&
        stocksList.length > 0 &&
        stocksList.map((stock: Stock) => (
          <StockCard
          key={stock.symbol}
          stock={stock}
          onDeleteStock={onDeleteStock}
          />
        ))}
        {loading && <Spinner />}
    </div>
  );
}
