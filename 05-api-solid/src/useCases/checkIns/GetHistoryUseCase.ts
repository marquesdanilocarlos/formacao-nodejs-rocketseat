import { CheckIn } from '../../../generated/prisma/client'
import CheckInsRepositoryInterface from '@/repositories/CheckInsRepositoryInterface'
import ResourceNotFoundError from '@/errors/ResourceNotFoundError'

interface GetHistoryRequest {
  userId: string
  page: number
}

interface GetHistoryResponse {
  checkIns: CheckIn[]
}

export default class GetHistoryUseCase {
  constructor(private checkInRepository: CheckInsRepositoryInterface) {}

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
