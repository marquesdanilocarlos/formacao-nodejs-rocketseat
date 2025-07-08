import { FastifyInstance } from 'fastify';
import { knexInstance } from '@/database';

export default async function transactionsRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    const transaction = await knexInstance('transactions')
      .select('*')
      .where('amount', '>', 100)
      .groupBy('id');

    return { transaction };
  });
}
