import { FastifyReply, FastifyRequest } from 'fastify'
import UserExistsError from '@/errors/user-exists.error'
import { registerBodySchema } from '@/validations/users.schema'
import RegisterUseCaseFactory from '@/factories/users/register-use-case.factory'

export default class UsersController {
  async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const registerUseCase = RegisterUseCaseFactory()
    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
      await registerUseCase.register({ name, email, password })
    } catch (error) {
      if (error instanceof UserExistsError) {
        return reply.status(409).send({ message: error.message })
      }

      throw error
    }

    return reply.status(201).send()
  }
}
