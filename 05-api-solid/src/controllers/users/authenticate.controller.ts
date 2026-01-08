import { FastifyReply, FastifyRequest } from 'fastify'
import { authenticateBodySchema } from '@/validations/users.schema'
import InvalidCredentialsError from '@/errors/invalid-credentials.error'
import AuthenticateUseCaseFactory from '@/factories/authenticate/authenticate-use-case.factory'
import Authenticate from '@/use-cases/authenticate/authenticate'

export default async function AuthenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase: Authenticate = AuthenticateUseCaseFactory()
    const { user } = await authenticateUseCase.execute({ email, password })
    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }
    throw error
  }
}
