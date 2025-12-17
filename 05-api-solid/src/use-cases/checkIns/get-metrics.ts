import CheckinsRepository from '@/repositories/checkins-repository'

interface GetMetricsRequest {
  userId: string
}

interface GetMetricsResponse {
  checkInsCount: number
}

export default class GetMetrics {
  constructor(private checkInsRepository: CheckinsRepository) {}

  async execute({ userId }: GetMetricsRequest): Promise<GetMetricsResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
