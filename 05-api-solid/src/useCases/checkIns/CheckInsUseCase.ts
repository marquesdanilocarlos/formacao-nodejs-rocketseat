import { CheckIn } from '../../../generated/prisma/client'
import CheckInsRepositoryInterface from '@/repositories/CheckInsRepositoryInterface'
import GymsRepositoryInterface from '@/repositories/GymsRepositoryInterface'
import ResourceNotFoundError from '@/errors/ResourceNotFoundError'
import getDistanceBetween from '@/utils/getDistanceBetween'

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
    private MAX_DISTANCE_IN_KM = 0.1,
  ) {}

  async execute({
    userId,
    gymId,
    userLongitude,
    userLatitude,
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

    const checkInDistance = getDistanceBetween(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    if (checkInDistance > this.MAX_DISTANCE_IN_KM) {
      throw new Error('User is too far from gym')
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
