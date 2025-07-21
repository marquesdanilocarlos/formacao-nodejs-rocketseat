import { FastifyReply, FastifyRequest } from 'fastify';
import { createSchema, loginSchema } from '@/validation/usersValidation';
import { knexInstance } from '@/database';

export default class UsersController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email } = loginSchema.parse(request.body);

    const user = await knexInstance('users').where('email', email).first();

    reply.cookie('sessionId', user.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return reply.status(200).send({ id: user.id });
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = createSchema.parse(request.body);

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
}
