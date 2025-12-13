import PrismaCheckinsRepository from '@/repositories/prisma/prisma-checkins.repository'
import ValidateCheckin from '@/useCases/checkIns/validate-checkin'

export default function ValidateCheckinUseCaseFactory() {
  const checkInRepository = new PrismaCheckinsRepository()
  return new ValidateCheckin(checkInRepository)
}
