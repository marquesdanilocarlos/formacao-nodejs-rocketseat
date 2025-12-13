import { CheckIn } from '../../../generated/prisma/client'
import CheckInsRepositoryInterface from '@/repositories/CheckInsRepositoryInterface'
import GymsRepositoryInterface from '@/repositories/GymsRepositoryInterface'
import ResourceNotFoundError from '@/errors/ResourceNotFoundError'
import getDistanceBetween from '@/utils/getDistanceBetween'
import MaxDistanceError from '@/errors/MaxDistanceError'
import MaxCheckInsError from '@/errors/MaxCheckInsError'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export default class DoCheckInUseCase {
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
      throw new MaxCheckInsError()
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
      throw new MaxDistanceError()
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
