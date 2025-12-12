import { expect, describe, it, beforeEach } from 'vitest'
import InMemoryCheckInsRepository from '@/repositories/memory/InMemoryCheckInsRepository'
import GetMetricsUseCase from '@/useCases/checkIns/GetMetricsUseCase'

describe('Get user history checkins Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: GetMetricsUseCase

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetMetricsUseCase(checkInsRepository)
  })

  it('should be able to count number of checkins by user', async () => {
    await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
