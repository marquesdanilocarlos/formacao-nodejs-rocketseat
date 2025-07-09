import { FastifyReply, FastifyRequest } from 'fastify';

export default async function checkSessionId(
  request: FastifyRequest,
  response: FastifyReply
): Promise<void> {
  const sessionId = request.cookies.sessionId;

  if (!sessionId) {
    return response.status(401).send({
      error: 'Unauthorized',
    });
  }
}
