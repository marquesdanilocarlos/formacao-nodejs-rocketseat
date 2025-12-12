import CheckInsRepositoryInterface from '@/repositories/CheckInsRepositoryInterface'

interface GetMetricsRequest {
  userId: string
}

interface GetMetricsResponse {
  checkInsCount: number
}

export default class GetMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepositoryInterface) {}

  async execute({ userId }: GetMetricsRequest): Promise<GetMetricsResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
