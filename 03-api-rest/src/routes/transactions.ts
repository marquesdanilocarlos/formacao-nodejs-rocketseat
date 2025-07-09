import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { knexInstance } from '@/database';

export default async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async (request: FastifyRequest, response: FastifyReply) => {
    const transactions = await knexInstance('transactions').select('*');

    return response.status(200).send(transactions);
  });

  app.get('/:id', async (request: FastifyRequest, response: FastifyReply) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamsSchema.parse(request.params);
    const transaction = await knexInstance('transactions').where('id', id).first();

    return response.status(200).send(transaction);
  });

  app.post('/', async (request: FastifyRequest, response: FastifyReply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(request.body);

    await knexInstance('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    });

    return response.status(201).send();
  });
}
