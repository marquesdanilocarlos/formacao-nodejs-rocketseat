import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import InMemoryCheckInsRepository from '@/repositories/memory/InMemoryCheckInsRepository'
import CheckInsUseCase from '@/useCases/checkIns/CheckInsUseCase'
import GymsRepositoryInterface from '@/repositories/GymsRepositoryInterface'
import { InMemoryGymsRepository } from '@/repositories/memory/InMemoryGymsRepository'
import { Gym } from '../../../generated/prisma/client'
import MaxCheckInsError from '@/errors/MaxCheckInsError'
import MaxDistanceError from '@/errors/MaxDistanceError'

describe('CheckIn Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let gymsRepository: GymsRepositoryInterface
  let sut: CheckInsUseCase
  let gym: Gym

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInsUseCase(checkInsRepository, gymsRepository)

    gym = await gymsRepository.create({
      title: 'Gym 01',
      description: 'Description 01',
      phone: '123456789',
      latitude: -15.4471074,
      longitude: -47.6196256,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: -15.4466112,
      userLongitude: -47.6198873,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on the same day', async () => {
    vi.setSystemTime(new Date(2025, 1, 2))

    await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: -15.4466112,
      userLongitude: -47.6198873,
    })

    await expect(async () => {
      await sut.execute({
        gymId: gym.id,
        userId: 'user-01',
        userLatitude: -15.4466112,
        userLongitude: -47.6198873,
      })
    }).rejects.toBeInstanceOf(MaxCheckInsError)
  })

  it('should be able to check in on different days', async () => {
    vi.setSystemTime(new Date(2025, 1, 2))

    await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: -15.4466112,
      userLongitude: -47.6198873,
    })

    vi.setSystemTime(new Date(2026, 1, 5))

    const { checkIn } = await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: -15.4466112,
      userLongitude: -47.6198873,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not to be able to check in on gym too far', async () => {
    await expect(async () => {
      await sut.execute({
        gymId: gym.id,
        userId: 'user-01',
        userLatitude: -15.4489063,
        userLongitude: -47.6186293,
      })
    }).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
