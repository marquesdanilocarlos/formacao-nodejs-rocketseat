import { FastifyReply, FastifyRequest } from 'fastify'

export default async function ensureAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify()
  } catch (e) {
    return reply.status(401).send({
      message: 'Unauthorized',
    })
  }
}
