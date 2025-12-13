import GymsRepository from '@/repositories/gyms-repository'
import { Gym } from '../../../generated/prisma/client'

interface SearchGymRequest {
  query: string
  page: number
}

interface SearchGymResponse {
  gyms: Gym[]
}

export default class SearchGyms {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ query, page }: SearchGymRequest): Promise<SearchGymResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
