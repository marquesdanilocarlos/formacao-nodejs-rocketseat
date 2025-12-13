import { FastifyReply, FastifyRequest } from 'fastify'

export default async function ProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  await request.jwtVerify()

  const userId = request.user.sub

  reply.status(200).send({
    userId,
  })

  return reply.send({
    message: 'Profile page',
  })
}
