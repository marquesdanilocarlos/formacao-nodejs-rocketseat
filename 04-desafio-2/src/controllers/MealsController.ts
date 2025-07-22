import { FastifyReply, FastifyRequest } from 'fastify';
import { createSchema } from '@/validation/mealsValidation';
import { knexInstance } from '@/database';

interface MealRequest {
  name: string;
  description: string;
  is_diet: boolean;
}

export default class MealsController {
  async index() {
    return { message: 'Listagem de refeições' };
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const requestData = request.body as MealRequest;
    const { name, description, is_diet } = createSchema.parse({
      ...requestData,
      user_id: request.cookies.sessionId,
    });

    const [{ id }] = await knexInstance('meals')
      .insert({
        id: crypto.randomUUID(),
        name,
        description,
        is_diet,
        user_id: request.cookies.sessionId,
      })
      .returning('id');

    return reply.status(201).send({ id });
  }

  async show() {
    return { message: 'Detalhes da refeição' };
  }

  async update() {
    return { message: 'Atualização de refeição' };
  }

  async delete() {
    return { message: 'Deletar refeição' };
  }
}
