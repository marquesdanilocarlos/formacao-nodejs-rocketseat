import { FastifyReply, FastifyRequest } from 'fastify'
import { createUserSchema } from '@/validators/usersValidator'
import createUseCase from '@/useCases/users/create'

export default class UsersController {
  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { name, email, password } = createUserSchema.parse(request.body)

    try {
      await createUseCase({ name, email, password })
    } catch (error) {
      reply.status(409).send()
    }

    reply.status(201).send()
  }
}
