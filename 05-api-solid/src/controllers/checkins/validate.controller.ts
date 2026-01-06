import { FastifyReply, FastifyRequest } from 'fastify'
import { validateCheckinParamsSchema } from '@/validations/checkin.schema'
import ValidateCheckinUseCaseFactory from '@/factories/checkIns/validate-checkin-use-case.factory'
import LateCheckinError from '@/errors/late-checkin.error'

export default async function ValidateController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const { checkInId } = validateCheckinParamsSchema.parse(request.params)

  const validateCheckinUseCase = ValidateCheckinUseCaseFactory()

  try {
    await validateCheckinUseCase.execute({
      checkInId,
    })
  } catch (error) {
    if (error instanceof LateCheckinError) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }

  return reply.status(204).send()
}
