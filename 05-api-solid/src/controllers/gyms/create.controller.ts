import { FastifyReply, FastifyRequest } from 'fastify'
import CreateGymUseCaseFactory from '@/factories/gyms/create-gym-use-case.factory'
import { createGymBodySchema } from '@/validations/gyms.schema'

export default async function CreateController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body)

  const createGymUseCase = CreateGymUseCaseFactory()

  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
