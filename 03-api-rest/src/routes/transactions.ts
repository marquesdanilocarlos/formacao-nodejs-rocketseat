import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { knexInstance } from '@/database';

export default async function transactionsRoutes(app: FastifyInstance) {
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
