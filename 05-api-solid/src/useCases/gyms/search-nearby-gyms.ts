import GymsRepository from '@/repositories/gyms-repository'
import { Gym } from '../../../generated/prisma/client'

interface SearchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface SearchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export default class SearchNearbyGyms {
  constructor(private gymsRepository: GymsRepository) {}
  async execute({
    userLatitude,
    userLongitude,
  }: SearchNearbyGymsUseCaseRequest): Promise<SearchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      userLatitude,
      userLongitude,
    })

    return {
      gyms,
    }
  }
}
