import { FastifyReply, FastifyRequest } from 'fastify'
import GetMetricsUseCaseFactory from '@/factories/checkIns/get-metrics-use-case.factory'

export default async function MetricsController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const getMetricsUseCase = GetMetricsUseCaseFactory()

  const { checkInsCount } = await getMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(checkInsCount)
}
