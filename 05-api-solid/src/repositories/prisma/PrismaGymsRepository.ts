import GymsRepositoryInterface, {
  FindManyNearbyParams,
} from '@/repositories/GymsRepositoryInterface'
import { GymCreateInput } from '../../../generated/prisma/models/Gym'
import { Gym } from '../../../generated/prisma/client'
import prisma from '@/prisma'

export default class PrismaGymsRepository implements GymsRepositoryInterface {
  async create(data: GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async findManyNearby({
    userLatitude,
    userLongitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms: Gym[] = await prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE ( 
      6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * 
                   cos( radians( userLongitude ) - radians(${userLongitude}) ) + 
                   sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) 
      ) <= 10`

    return gyms
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }
}
