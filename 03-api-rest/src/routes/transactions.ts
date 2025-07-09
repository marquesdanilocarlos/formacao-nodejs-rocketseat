import { FastifyInstance } from 'fastify';
import TransactionsController from '@/controllers/Transactions';
import checkSessionId from '@/middlewares/checkSessionId';

export default async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', checkSessionId);
  const transactionsController = new TransactionsController();

  app.get('/', transactionsController.index);

  app.get('/:id', transactionsController.get);

  app.get('/summary', transactionsController.summary);

  app.post('/', transactionsController.create);
}
