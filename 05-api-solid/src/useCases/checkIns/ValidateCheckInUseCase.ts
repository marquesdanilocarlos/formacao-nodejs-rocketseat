import { CheckIn } from '../../../generated/prisma/client'
import CheckInsRepositoryInterface from '@/repositories/CheckInsRepositoryInterface'
import ResourceNotFoundError from '@/errors/ResourceNotFoundError'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export default class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInsRepositoryInterface) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.isValidated = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
