import { FastifyReply, FastifyRequest } from 'fastify';
import { knexInstance } from '@/database';
import { z } from 'zod';

export default class TransactionsController {
  async index(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const { sessionId } = request.cookies;
    const transactions = await knexInstance('transactions')
      .select('*')
      .where('session_id', sessionId);

    return response.status(200).send(transactions);
  }

  async get(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const { sessionId } = request.cookies;
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamsSchema.parse(request.params);
    const transaction = await knexInstance('transactions')
      .where({ id, session_id: sessionId })
      .first();

    return response.status(200).send(transaction);
  }

  async summary(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const { sessionId } = request.cookies;
    const summary = await knexInstance('transactions')
      .sum('amount', { as: 'amount' })
      .where('session_id', sessionId)
      .first();
    return response.status(200).send(summary);
  }

  async create(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      response.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    await knexInstance('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    });

    return response.status(201).send();
  }
}
