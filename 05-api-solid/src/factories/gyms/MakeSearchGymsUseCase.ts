import PrismaGymsRepository from '@/repositories/prisma/PrismaGymsRepository'
import SearchGymsUseCase from '@/useCases/gyms/SearchGymsUseCase'

export default function MakeSearchGymsUseCase() {
  const gymRepository = new PrismaGymsRepository()
  return new SearchGymsUseCase(gymRepository)
}
