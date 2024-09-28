import { IsString, IsOptional, Length, Min, IsNumber } from 'class-validator';

export class StockDto {
  @IsString()
  @Length(1, 5)
  symbol: string;

  @IsString()
  @Length(2, 50)
  companyName: string;

  @IsString()
  @Length(10, 200)
  image: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  changes: number;
}
