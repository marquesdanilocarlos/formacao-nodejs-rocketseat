import PrismaCheckInsRepository from '@/repositories/prisma/PrismaCheckInsRepository'
import GetHistoryUseCase from '@/useCases/checkIns/GetHistoryUseCase'

export default function MakeGetHistoryUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  return new GetHistoryUseCase(checkInRepository)
}
