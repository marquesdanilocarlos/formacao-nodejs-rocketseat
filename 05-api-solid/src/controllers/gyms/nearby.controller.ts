import { FastifyReply, FastifyRequest } from 'fastify'
import { nearbyGymsQuerySchema } from '@/validations/gyms.schema'
import SearchNearbyGymsUseCaseFactory from '@/factories/gyms/search-nearby-gyms-use-case.factory'

export default async function NearbyController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const nearbyGymsUseCase = SearchNearbyGymsUseCaseFactory()

  const { gyms } = await nearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send(gyms)
}
