import * as knex from 'knex';
import env from './validation/env';

export const config = {
  client: env.DB_CLIENT,
  connection: {
    filename: env.DB_URL,
  },
};

export const knexInstance = knex(config);
