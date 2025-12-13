import { expect, describe, it, beforeEach } from 'vitest'
import InMemoryCheckinsRepository from '@/repositories/memory/in-memory-checkins.repository'
import GetMetrics from '@/useCases/checkIns/get-metrics'

describe('Get user history checkins Use Case', () => {
  let checkInsRepository: InMemoryCheckinsRepository
  let sut: GetMetrics

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinsRepository()
    sut = new GetMetrics(checkInsRepository)
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
