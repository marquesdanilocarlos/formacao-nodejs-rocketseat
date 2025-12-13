import { FastifyReply, FastifyRequest } from 'fastify'
import { authenticateBodySchema } from '@/validations/usersValidations'
import InvalidCredentialsError from '@/errors/InvalidCredentialsError'
import MakeAuthenticateUseCase from '@/factories/authenticate/MakeAuthenticateUseCase'

export default class AuthenticateController {
  async authenticate(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
      const authenticateUseCase = MakeAuthenticateUseCase()
      await authenticateUseCase.execute({ email, password })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(401).send({ message: error.message })
      }
      throw error
    }

    return reply.status(200).send()
  }
}
