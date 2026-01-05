import { FastifyReply, FastifyRequest } from 'fastify'
import GetProfileUseCaseFactory from '@/factories/users/get-profile-use-case.factory'
import ResourceNotFoundError from '@/errors/resource-not-found.error'

export default async function ProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const getProfileUseCase = GetProfileUseCaseFactory()

  const userId = request.user.sub
  const { user } = await getProfileUseCase.execute({ userId })

  if (!user) {
    throw new ResourceNotFoundError()
  }

  const { passwordHash: _, ...userWithoutPassword } = user

  return reply.status(200).send({
    user: userWithoutPassword,
  })
}
