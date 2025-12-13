import PrismaGymsRepository from '@/repositories/prisma/PrismaGymsRepository'
import CreateGymUseCase from '@/useCases/gyms/CreateGymUseCase'

export default function MakeCreateGymUseCase() {
  const gymRepository = new PrismaGymsRepository()
  return new CreateGymUseCase(gymRepository)
}
