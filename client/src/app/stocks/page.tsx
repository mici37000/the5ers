import { ResponseObject } from "../core/models/response-object.model";
import { Stock } from "./models/stock.model";
import SearchPane from "./SearchPane";
import StocksPane from "./StocksPane";

export default async function Stocks() {
  async function getStocks(): Promise<Stock[]> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_URI}/stocks`,
        { cache: 'no-store' }
      );

      if (!response.ok) {
        console.error(
          `Failed to fetch stocks: ${response.status} ${response.statusText}`
        );
        throw new Error(`Failed to load stocks: ${response.statusText}`);
      }

      const parsed: ResponseObject = await response.json();

      if (!parsed?.data || !Array.isArray(parsed.data)) {
        throw new Error('Invalid data structure received from the server');
      }

      return parsed.data;
    } catch (error) {
      console.error('Error loading stocks:', error);
      return [];
    }
  }

  const stocks = await getStocks();

  return (
    <div className="flex flex-col md:flex-row min-h-full">
      <SearchPane />
      <StocksPane stocks={stocks} />
    </div>
  );
}
