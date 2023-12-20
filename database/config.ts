import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
};
