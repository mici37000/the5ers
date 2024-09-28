import * as mongoose from 'mongoose';

export const StockSchema = new mongoose.Schema({
  symbol: String,
  companyName: String,
  author: String,
  image: String,
  price: Number,
  changes: Number,
});
