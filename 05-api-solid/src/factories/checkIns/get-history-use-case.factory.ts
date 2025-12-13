import PrismaCheckinsRepository from '@/repositories/prisma/prisma-checkins.repository'
import GetHistory from '@/useCases/checkIns/get-history'

export default function GetHistoryUseCaseFactory() {
  const checkInRepository = new PrismaCheckinsRepository()
  return new GetHistory(checkInRepository)
}
