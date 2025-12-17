import { expect, describe, it, beforeEach } from 'vitest'
import InMemoryCheckinsRepository from '@/repositories/memory/in-memory-checkins.repository'
import GetHistory from '@/use-cases/checkIns/get-history'

describe('Get user history checkins Use Case', () => {
  let checkInsRepository: InMemoryCheckinsRepository
  let sut: GetHistory

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinsRepository()
    sut = new GetHistory(checkInsRepository)
  })

  it('should be able to get the user checkins history', async () => {
    const firstCheckIn = await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    const secondCheckIn = await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining(firstCheckIn),
      expect.objectContaining(secondCheckIn),
    ])
  })

  it('should be able to get the user checkins history by page', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: 'user-01',
        gym_id: `gym-${i}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
