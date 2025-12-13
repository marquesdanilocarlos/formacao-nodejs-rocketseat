import { FastifyReply, FastifyRequest } from 'fastify'
import { authenticateBodySchema } from '@/validations/users.schema'
import InvalidCredentialsError from '@/errors/invalid-credentials.error'
import AuthenticateUseCaseFactory from '@/factories/authenticate/authenticate-use-case.factory'

export default async function AuthenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = AuthenticateUseCaseFactory()
    await authenticateUseCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send()
}
