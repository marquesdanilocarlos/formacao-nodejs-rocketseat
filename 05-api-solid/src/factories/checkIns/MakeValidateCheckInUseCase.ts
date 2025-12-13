import PrismaCheckInsRepository from '@/repositories/prisma/PrismaCheckInsRepository'
import ValidateCheckInUseCase from '@/useCases/checkIns/ValidateCheckInUseCase'

export default function MakeValidateCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  return new ValidateCheckInUseCase(checkInRepository)
}
