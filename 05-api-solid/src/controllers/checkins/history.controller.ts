import { FastifyReply, FastifyRequest } from 'fastify'
import GetHistoryUseCaseFactory from '@/factories/checkIns/get-history-use-case.factory'
import { getHisttoryQuerySchema } from '@/validations/checkin.schema'

export default async function HistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const { page } = getHisttoryQuerySchema.parse(request.query)

  const getHistoryUseCase = GetHistoryUseCaseFactory()

  const { checkIns } = await getHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send(checkIns)
}
