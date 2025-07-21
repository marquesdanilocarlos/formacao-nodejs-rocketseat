import { FastifyReply, FastifyRequest } from 'fastify';

export default async function checkSessionId(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const sessionId = request.cookies.sessionId;

  if (!sessionId) {
    return reply.status(401).send({
      message: 'Unauthorized',
    });
  }
}
