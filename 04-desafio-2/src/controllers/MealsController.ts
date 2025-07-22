import { FastifyReply, FastifyRequest } from 'fastify';
import { createSchema, showSchema } from '@/validation/mealsValidation';
import { knexInstance } from '@/database';

interface MealRequest {
  name: string;
  description: string;
  is_diet: boolean;
}

export default class MealsController {
  async index(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const meals = await knexInstance('meals')
      .where('user_id', request.cookies.sessionId)
      .select('*');

    if (!meals) {
      return reply.status(404).send({ message: 'Nenhuma refeição encontrada.' });
    }

    return reply.status(200).send(meals);
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

  async show(resquest: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = showSchema.parse(resquest.params);

    const meal = await knexInstance('meals')
      .where('id', id)
      .where('user_id', resquest.cookies.sessionId)
      .first();

    if (!meal) {
      return reply.status(404).send({ message: 'Refeição nao encontrada.' });
    }

    return reply.status(200).send(meal);
  }

  async update() {
    return { message: 'Atualização de refeição' };
  }

  async delete() {
    return { message: 'Deletar refeição' };
  }
}
