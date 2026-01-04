import GymsRepository, {
  FindManyNearbyParams,
} from '@/repositories/gyms-repository'
import { GymCreateInput } from '../../../generated/prisma/models/Gym'
import { Gym } from '../../../generated/prisma/client'
import PrismaAbstractRepository from '@/repositories/prisma/prisma-abstract-repository'

export default class PrismaGymsRepository
  extends PrismaAbstractRepository
  implements GymsRepository
{
  constructor() {
    super()
  }

  async create(data: GymCreateInput): Promise<Gym> {
    const gym = await this.prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await this.prisma.gym.findUnique({
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
    const gyms: Gym[] = await this.prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE ( 
      6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * 
                   cos( radians( userLongitude ) - radians(${userLongitude}) ) + 
                   sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) 
      ) <= 10`

    return gyms
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await this.prisma.gym.findMany({
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
