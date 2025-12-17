import PrismaGymsRepository from '@/repositories/prisma/prisma-gyms.repository'
import SearchGyms from '@/use-cases/gyms/search-gyms'

export default function SearchGymsUseCaseFactory() {
  const gymRepository = new PrismaGymsRepository()
  return new SearchGyms(gymRepository)
}
