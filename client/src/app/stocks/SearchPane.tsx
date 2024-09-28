"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./SearchPane.module.scss";
import { Stock } from "./models/stock.model";
import { ResponseObject } from "../core/models/response-object.model";
import Spinner from "../shared/Spinner";

export default function SearchPane() {
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function searchStocks(text: string) {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STOCKS_API_URI}/search?query=${text}&limit=20&apikey=${process.env.NEXT_PUBLIC_STOCKS_API_KEY}`
      );
      const parsed = await response.json();

      if (response.ok && parsed) {
        // Filter out ETFs
        const stocksOnly = parsed.filter((stock: Stock) => {
          return !stock.name.includes('ETF') && !stock.symbol.includes('.');
        });
        setSearchResults(stocksOnly);
        setLoading(false);
      } else {
        throw new Error(`Failed to load search results`);
      }
    } catch (error) {
      console.error('Failed to load search results:', error);
      setLoading(false);
      setError('An error occurred while searching for stocks.');
      alert(error);
    }
  }

  async function onSearchChange(text: string): Promise<void> {
    if (text.length > 0) {
      await searchStocks(text);
    } else {
      setSearchResults([]);
    }
  }

  function generateImageSrc(symbol: string): string {
    return `https://financialmodelingprep.com/image-stock/${symbol}.png`;
  }

  async function onSaveClick(stock: Stock): Promise<void> {
    const stockForSave: Stock = {
      symbol: stock.symbol,
      companyName: stock.name,
      image: generateImageSrc(stock.symbol)
    };

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_URI}/stocks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stockForSave)
        }
      );
      const parsed: ResponseObject = await response.json();

      if (response.ok && parsed.data) {
        location.reload();
      } else {
        throw new Error(`Failed to save stock: ${stock.symbol}`);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error saving stock:', error);
      alert('An error occurred while saving the stock. Please check the log.');
    }
  }

  return (
    <div className={`basis-full md:basis-1/4 flex-none p-4 ${styles.container}`}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="searchTB"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter stock name or symbol"
          maxLength={40}
          onInput={(e) => onSearchChange(e.target.value)}
          autoFocus
        />
      </div>
      <div
        className={`mt-7 w-100 text-gray-900 bg-white border border-gray-200 rounded-md ${
          searchResults.length === 0 ? "hidden" : ""
        }`}
      >
        {Array.isArray(searchResults) &&
          searchResults.length > 0 &&
          searchResults.map((stock: Stock) => (
            <button
              type="button"
              key={stock.symbol}
              className="relative inline-flex items-center w-full px-4 py-2 text-md border-b border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700"
              title="Add to list"
              onClick={() => onSaveClick(stock)}
            >
              <Image
                src={generateImageSrc(stock.symbol)}
                width={28}
                height={28}
                alt={stock.name}
                className="mr-2"
              />
              {stock.name}
            </button>
          ))}
      </div>
      {loading && <Spinner />}
    </div>
  );
}
