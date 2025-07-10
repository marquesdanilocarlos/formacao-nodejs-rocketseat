import { FastifyInstance } from 'fastify';
import TransactionsController from '@/controllers/Transactions';
import checkSessionId from '@/middlewares/checkSessionId';

export default async function transactionsRoutes(app: FastifyInstance) {
  //app.addHook('preHandler', checkSessionId);
  const transactionsController = new TransactionsController();

  app.get('/', { preHandler: [checkSessionId] }, transactionsController.index);

  app.get('/:id', { preHandler: [checkSessionId] }, transactionsController.get);

  app.get('/summary', { preHandler: [checkSessionId] }, transactionsController.summary);

  app.post('/', transactionsController.create);
}
