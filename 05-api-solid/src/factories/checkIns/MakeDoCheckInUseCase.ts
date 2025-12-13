import PrismaCheckInsRepository from '@/repositories/prisma/PrismaCheckInsRepository'
import PrismaGymsRepository from '@/repositories/prisma/PrismaGymsRepository'
import DoCheckInUseCase from '@/useCases/checkIns/DoCheckInUseCase'

export default function MakeDoCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  return new DoCheckInUseCase(checkInRepository, gymsRepository)
}
