"use client";
import Image from "next/image";
import styles from "./StockCard.module.scss";
import Link from "next/link";
import { Stock } from "./models/stock.model";

interface StockCardProps {
  stock: Stock;
  onDeleteStock: (symbol: string) => void;
}

export default function StockCard({ stock, onDeleteStock }: StockCardProps) {
  return (
    <div
      className={`flex flex-col items-center basis-1/5 relative bg-white border border-gray-200 hover:bg-gray-100 rounded-md shadow md:flex-row p-3 ${styles.card}`}
    >
      <Image
        src={stock.image}
        width={64}
        height={64}
        alt={stock.companyName}
        className="rounded-full"
      />
      <div className="flex flex-col justify-between p-2 leading-normal">
        <div className="text-lg mb-2">{stock.companyName} ({stock.symbol})</div>
        <div>
          <Link href={`/stocks/quote/${stock.symbol}`}>
            <button type="button" className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-md text-md px-2 py-1">
              More info
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </button>
          </Link>
        </div>
      </div>
      <svg className={`w-6 h-6 text-gray-800 absolute hover:bg-gray-100 ${styles.remove}`} onClick={()=> onDeleteStock(stock.symbol)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
      </svg>
    </div>
  );
}
