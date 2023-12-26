import { DataSource } from 'typeorm';

import { databaseConfig } from './database/config';

export const TypeOrmDataSource = new DataSource(databaseConfig);
