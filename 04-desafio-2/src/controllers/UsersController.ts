import { FastifyReply, FastifyRequest } from 'fastify';
import usersSchema from '@/validation/usersValidation';
import { knexInstance } from '@/database';

export default class UsersController {
  async index() {
    return { message: 'Listagem de usuários' };
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = usersSchema.parse(request.body);

    const [{ id }] = await knexInstance('users')
      .insert({
        id: crypto.randomUUID(),
        name,
        email,
      })
      .returning('id');

    reply.cookie('sessionId', id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return reply.status(201).send({ id });
  }

  async show() {
    return { message: 'Detalhes de usuário' };
  }

  async update() {
    return { message: 'Atualização de usuário' };
  }

  async delete() {
    return { message: 'Exclusão de usuário' };
  }
}
