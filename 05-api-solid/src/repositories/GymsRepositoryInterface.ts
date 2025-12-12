import { Gym } from '../../generated/prisma/client'
import { GymCreateInput } from '../../generated/prisma/models/Gym'

export interface FindManyNearbyParams {
  userLatitude: number
  userLongitude: number
}

interface GymsRepositoryInterface {
  create(data: GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby({
    userLatitude,
    userLongitude,
  }: FindManyNearbyParams): Promise<Gym[]>
}

export default GymsRepositoryInterface
