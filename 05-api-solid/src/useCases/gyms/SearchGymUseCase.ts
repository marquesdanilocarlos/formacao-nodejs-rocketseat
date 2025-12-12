import GymsRepositoryInterface from '@/repositories/GymsRepositoryInterface'
import { Gym } from '../../../generated/prisma/client'

interface SearchGymRequest {
  query: string
  page: number
}

interface SearchGymResponse {
  gyms: Gym[]
}

export default class SearchGymUseCase {
  constructor(private gymsRepository: GymsRepositoryInterface) {}

  async execute({ query, page }: SearchGymRequest): Promise<SearchGymResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
