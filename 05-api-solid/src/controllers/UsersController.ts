import { FastifyReply, FastifyRequest } from 'fastify'
import UserExistsError from '@/errors/UserExistsError'
import { registerBodySchema } from '@/validations/usersValidations'
import MakeRegisterUseCase from '@/factories/users/MakeRegisterUseCase'

export default class UsersController {
  async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const registerUseCase = MakeRegisterUseCase()
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
