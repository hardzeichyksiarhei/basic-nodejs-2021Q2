import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

export default {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
  entities: [path.join(__dirname, '../**/*.entity.ts')],

  migrationsTableName: 'migrations',
  migrations: [path.join(__dirname, '../../database/migrations/*.ts')],
  cli: { migrationsDir: 'src/migrations' },

  seeds: [path.join(__dirname, '../../database/seeds/*.ts')],
  factories: [path.join(__dirname, '../../database/factories/*.ts')],
} as ConnectionOptions;
