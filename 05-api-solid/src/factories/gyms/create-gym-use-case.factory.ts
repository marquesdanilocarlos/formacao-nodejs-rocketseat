import PrismaGymsRepository from '@/repositories/prisma/prisma-gyms.repository'
import CreateGym from '@/use-cases/gyms/create-gym'

export default function CreateGymUseCaseFactory() {
  const gymRepository = new PrismaGymsRepository()
  return new CreateGym(gymRepository)
}
