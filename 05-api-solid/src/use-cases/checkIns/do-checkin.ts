import { CheckIn } from '../../../generated/prisma/client'
import CheckinsRepository from '@/repositories/checkins-repository'
import GymsRepository from '@/repositories/gyms-repository'
import ResourceNotFoundError from '@/errors/resource-not-found.error'
import getDistanceBetween from '@/utils/get-distance-between'
import MaxDistanceError from '@/errors/max-distance.error'
import MaxCheckinsError from '@/errors/max-checkins.error'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export default class DoCheckin {
  constructor(
    private checkInRepository: CheckinsRepository,
    private gymsRepository: GymsRepository,
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
      throw new MaxCheckinsError()
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
