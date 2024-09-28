"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Stock } from "../../models/stock.model";
import Spinner from "@/app/shared/Spinner";

interface Params {
  params: {
    symbol: string;
  };
}

export default function Quote({ params }: Params) {
  const { symbol } = params;
  const [stockData, setStockData] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStock() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STOCKS_API_URI}/profile/${symbol}?apikey=${process.env.NEXT_PUBLIC_STOCKS_API_KEY}`,
          { cache: 'no-store' }
        );
        const parsed = await response.json();

        if (response.ok && parsed && parsed[0]) {
          setStockData(parsed[0]);
        } else {
          throw new Error(`Failed to load stock data: ${symbol}`);
        }
      } catch (error) {
        console.error('Error loading stock:', error);
        setError('An error occurred while loading stock data.');
      } finally {
        setLoading(false);
      }
    }

    fetchStock();
  }, [symbol]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex items-center w-full md:w-1/4 mx-auto mt-4 p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
        <div className="text-lg">
          <span className="font-bold">Caution!</span><br /> <span className="text-base">{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full">
      <div className="p-2">
        <a href="/" className="inline-flex items-center text-lg font-bold text-blue-600 hover:underline">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="#1c64f2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
          </svg>
          Back to list
        </a>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center w-full md:w-1/3 bg-white border border-gray-200 rounded-lg shadow p-5">
          {stockData && (
            <>
              <Image
                src={stockData.image}
                width={128}
                height={128}
                alt={stockData.companyName}
              />
              <div className="pt-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {stockData.companyName} ({stockData.symbol})
                </h5>
                <div className="mb-1 font-normal">Price: <span className="text-gray-800">{stockData.price}</span></div>
                <div className="mb-1 font-normal">Change: <span className="text-gray-800">{`${stockData.changes}%`}</span></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
