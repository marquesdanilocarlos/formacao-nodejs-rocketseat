import { Gym } from '../../generated/prisma/client'
import { GymCreateInput } from '../../generated/prisma/models/Gym'

interface GymsRepositoryInterface {
  create(data: GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
}

export default GymsRepositoryInterface
