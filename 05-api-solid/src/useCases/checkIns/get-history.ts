import { CheckIn } from '../../../generated/prisma/client'
import CheckinsRepository from '@/repositories/checkins-repository'
import ResourceNotFoundError from '@/errors/resource-not-found.error'

interface GetHistoryRequest {
  userId: string
  page: number
}

interface GetHistoryResponse {
  checkIns: CheckIn[]
}

export default class GetHistory {
  constructor(private checkInRepository: CheckinsRepository) {}

  async execute({
    userId,
    page,
  }: GetHistoryRequest): Promise<GetHistoryResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    if (!checkIns) {
      throw new ResourceNotFoundError()
    }

    return {
      checkIns,
    }
  }
}
