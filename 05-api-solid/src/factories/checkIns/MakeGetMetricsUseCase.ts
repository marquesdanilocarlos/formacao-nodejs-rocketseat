import PrismaCheckInsRepository from '@/repositories/prisma/PrismaCheckInsRepository'
import GetMetricsUseCase from '@/useCases/checkIns/GetMetricsUseCase'

export default function MakeGetMetricsUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  return new GetMetricsUseCase(checkInRepository)
}
