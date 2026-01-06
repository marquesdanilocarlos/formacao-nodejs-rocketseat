import { FastifyReply, FastifyRequest } from 'fastify'
import DoCheckinUseCaseFactory from '@/factories/checkIns/do-checkin-use-case.factory'
import {
  doCheckinBodySchema,
  doCheckinParamsSchema,
} from '@/validations/checkin.schema'

export default async function DoCheckinController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const { gymId } = doCheckinParamsSchema.parse(request.params)
  const { latitude, longitude } = doCheckinBodySchema.parse(request.body)

  const doCheckinUseCase = DoCheckinUseCaseFactory()

  await doCheckinUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
