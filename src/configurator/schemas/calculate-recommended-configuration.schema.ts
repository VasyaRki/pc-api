import { IsNotEmpty, IsNumber } from 'class-validator';

export class CalculateRecommendedConfigurationSchema {
  @IsNotEmpty()
  @IsNumber()
  readonly performance: number;

  @IsNotEmpty()
  @IsNumber()
  readonly budget: number;

  @IsNotEmpty()
  @IsNumber()
  readonly memory: number;
}

// 300-500$

// 450
// max index, price <= 450
// 1          2        3        4
// 101 - 200, 200-300, 300-400, 400-500
