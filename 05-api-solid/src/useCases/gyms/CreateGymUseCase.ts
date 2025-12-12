import GymsRepositoryInterface from '@/repositories/GymsRepositoryInterface'
import { Gym } from '../../../generated/prisma/client'

interface CreateGymRequest {
  title: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
}

interface CreateGymResponse {
  gym: Gym
}

export default class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepositoryInterface) {}

  async execute(gymData: CreateGymRequest): Promise<CreateGymResponse> {
    const gym: Gym = await this.gymsRepository.create(gymData)

    return {
      gym,
    }
  }
}
