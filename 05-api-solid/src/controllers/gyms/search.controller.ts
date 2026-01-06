import { FastifyReply, FastifyRequest } from 'fastify'
import { searGymsQuerySchema } from '@/validations/gyms.schema'
import SearchGymsUseCaseFactory from '@/factories/gyms/search-gyms-use-case.factory'

export default async function SearchController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const { query, page } = searGymsQuerySchema.parse(request.query)

  const searchGymsUseCase = SearchGymsUseCaseFactory()

  const { gyms } = await searchGymsUseCase.execute({ query, page })

  return reply.status(200).send(gyms)
}
