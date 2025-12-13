import PrismaGymsRepository from '@/repositories/prisma/PrismaGymsRepository'
import SearchNearbyGymsUseCase from '@/useCases/gyms/SearchNearbyGymsUseCase'

export default function MakeSearchNearbyGymsUseCase() {
  const gymRepository = new PrismaGymsRepository()
  return new SearchNearbyGymsUseCase(gymRepository)
}
