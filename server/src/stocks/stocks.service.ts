import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios, { AxiosResponse } from 'axios';
import { Stock } from './models/stock.model';
import { StockDto } from './dto/stock.dto';

@Injectable()
export class StocksService {
  constructor(
    @InjectModel('Stock') private readonly stockModel: Model<Stock>,
  ) {}

  public async findAll(): Promise<Stock[]> {
    return this.stockModel.find().exec();
  }

  public async findBySymbol(symbol: string): Promise<Stock> {
    return this.stockModel.findOne({ symbol }).exec();
  }

  public async findBySymbolLiveData(symbol: string): Promise<Stock> {
    const response: AxiosResponse = await axios.get(
      `${process.env.STOCKS_API_URI}/profile/${symbol}?apikey=${process.env.STOCKS_API_KEY}`,
    );
    const stockData: Stock = response.data;

    if (Array.isArray(stockData) && stockData.length === 0) {
      throw new NotFoundException(`Stock symbol ${symbol} does not exists`);
    }

    return stockData;
  }

  public async create(dto: StockDto): Promise<Stock> {
    const stock: Stock = await this.findBySymbol(dto.symbol);

    if (stock) {
      throw new ConflictException(`Symbol ${dto.symbol} already exists`, {
        cause: [{ property: 'symbol' }],
      });
    } else {
      const saved = new this.stockModel(dto);
      return saved.save();
    }
  }

  public async delete(symbol: string): Promise<any> {
    const deleted = await this.stockModel.findOneAndDelete({ symbol });
    return deleted;
  }
}
