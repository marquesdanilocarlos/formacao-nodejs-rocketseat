import { CheckIn } from '../../../generated/prisma/client'
import CheckinsRepository from '@/repositories/checkins-repository'
import ResourceNotFoundError from '@/errors/resource-not-found.error'
import dayjs from 'dayjs'
import LateCheckinError from '@/errors/late-checkin.error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export default class ValidateCheckin {
  constructor(private checkInRepository: CheckinsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.createdAt,
      'minutes',
    )
    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckinError()
    }

    checkIn.isValidated = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
