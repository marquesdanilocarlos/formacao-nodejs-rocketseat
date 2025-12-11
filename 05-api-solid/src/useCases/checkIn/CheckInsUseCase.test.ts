import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import InMemoryCheckInsRepository from '@/repositories/memory/InMemoryCheckInsRepository'
import CheckInsUseCase from '@/useCases/checkIn/CheckInsUseCase'

describe('CheckIn Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: CheckInsUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInsUseCase(checkInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on the same day', async () => {
    vi.setSystemTime(new Date(2025, 1, 2))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await expect(async () => {
      await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in on different days', async () => {
    vi.setSystemTime(new Date(2025, 1, 2))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    vi.setSystemTime(new Date(2026, 1, 5))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
