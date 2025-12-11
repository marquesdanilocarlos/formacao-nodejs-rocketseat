import { CheckIn } from '../../../generated/prisma/client'
import CheckInsRepositoryInterface from '@/repositories/CheckInsRepositoryInterface'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export default class CheckInsUseCase {
  constructor(private checkInRepository: CheckInsRepositoryInterface) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkInOnSameDate = await this.checkInRepository.findByUserOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new Error('User already checked in today')
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
