import GymsRepositoryInterface from '@/repositories/GymsRepositoryInterface'
import { Gym } from '../../../generated/prisma/client'

interface SearchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface SearchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export default class SearchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepositoryInterface) {}
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
