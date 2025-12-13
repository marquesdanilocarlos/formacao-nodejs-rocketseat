import PrismaGymsRepository from '@/repositories/prisma/prisma-gyms.repository'
import SearchNearbyGyms from '@/useCases/gyms/search-nearby-gyms'

export default function SearchNearbyGymsUseCaseFactory() {
  const gymRepository = new PrismaGymsRepository()
  return new SearchNearbyGyms(gymRepository)
}
