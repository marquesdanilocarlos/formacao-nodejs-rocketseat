import { CheckIn } from '../../../generated/prisma/client'
import CheckInsRepositoryInterface from '@/repositories/CheckInsRepositoryInterface'
import GymsRepositoryInterface from '@/repositories/GymsRepositoryInterface'
import ResourceNotFoundError from '@/errors/ResourceNotFoundError'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export default class CheckInsUseCase {
  constructor(
    private checkInRepository: CheckInsRepositoryInterface,
    private gymsRepository: GymsRepositoryInterface,
  ) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

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
