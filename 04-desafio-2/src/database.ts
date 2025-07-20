import knex from 'knex';
import env from './validation/env';

export const config = {
  client: env.DB_CLIENT,
  connection: {
    filename: env.DB_URL,
  },
  migrations: {
    directory: './database/migrations',
  },
  useNullAsDefault: true,
};

export const knexInstance = knex(config);
