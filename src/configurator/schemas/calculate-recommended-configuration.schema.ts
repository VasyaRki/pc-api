import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CalculateRecommendedConfigurationSchema {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly performance: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly budget: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly memory: number;
}

// 300-500$

// 450
// max index, price <= 450
// 1          2        3        4
// 101 - 200, 200-300, 300-400, 400-500
