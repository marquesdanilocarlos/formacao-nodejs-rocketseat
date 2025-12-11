import AuthenticateService from '@/services/AuthenticateService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { authenticateBodySchema } from '@/validations/usersValidations'
import InvalidCredentialsError from '@/errors/InvalidCredentialsError'

export default function AuthenticateController(
  authenticateService: AuthenticateService,
) {
  return {
    authenticate: async (
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<void> => {
      const { email, password } = authenticateBodySchema.parse(request.body)

      try {
        await authenticateService.execute({ email, password })
      } catch (error) {
        if (error instanceof InvalidCredentialsError) {
          return reply.status(401).send({ message: error.message })
        }
        throw error
      }

      return reply.status(200).send()
    },
  }
}
