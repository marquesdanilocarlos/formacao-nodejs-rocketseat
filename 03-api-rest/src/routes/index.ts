import transactionsRoutes from '@/routes/transactions';
import { FastifyInstance } from 'fastify';

export default async function routes(app: FastifyInstance): Promise<void> {
  app.register(transactionsRoutes, {
    prefix: '/transactions',
  });
}
