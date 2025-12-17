import PrismaCheckinsRepository from '@/repositories/prisma/prisma-checkins.repository'
import PrismaGymsRepository from '@/repositories/prisma/prisma-gyms.repository'
import DoCheckin from '@/use-cases/checkIns/do-checkin'

export default function DoCheckinUseCaseFactory() {
  const checkInRepository = new PrismaCheckinsRepository()
  const gymsRepository = new PrismaGymsRepository()
  return new DoCheckin(checkInRepository, gymsRepository)
}
