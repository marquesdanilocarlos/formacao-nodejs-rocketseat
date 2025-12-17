import PrismaCheckinsRepository from '@/repositories/prisma/prisma-checkins.repository'
import GetMetrics from '@/use-cases/checkIns/get-metrics'

export default function GetMetricsUseCaseFactory() {
  const checkInRepository = new PrismaCheckinsRepository()
  return new GetMetrics(checkInRepository)
}
