export interface Stock {
  symbol: string;
  companyName: string;
  image: string;
  price?: number;
  changes?: number;
}
