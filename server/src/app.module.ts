import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksModule } from './stocks/stocks.module';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const dbConnectionOptions: MongooseModuleOptions = {
  dbName: process.env.DB_NAME
};

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_HOST, dbConnectionOptions),
    StocksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  async onModuleDestroy() {
    await mongoose.disconnect();
  }
}
