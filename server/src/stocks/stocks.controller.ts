import { Controller, Delete, Get, Param, Post, Request, Body, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { Stock } from './models/stock.model';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { StockDto } from './dto/stock.dto';

@UseFilters(HttpExceptionFilter)
@Controller('stocks')
@UseInterceptors(TransformInterceptor)
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get('/')
  async findAll(): Promise<Stock[]> {
    return this.stocksService.findAll();
  }

  @Get('/:symbol')
  async findOne(@Param('symbol') symbol: string): Promise<Stock> {
    return this.stocksService.findBySymbolLiveData(symbol);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  async create(@Request() req, @Body() dto: StockDto): Promise<Stock> {
    return this.stocksService.create(dto);
  }

  @Delete('/:symbol')
  async delete(@Param('symbol') symbol: string): Promise<boolean> {
    return this.stocksService.delete(symbol);
  }
}
