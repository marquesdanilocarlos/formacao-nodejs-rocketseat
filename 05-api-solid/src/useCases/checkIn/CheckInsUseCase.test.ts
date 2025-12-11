import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import InMemoryCheckInsRepository from '@/repositories/memory/InMemoryCheckInsRepository'
import CheckInsUseCase from '@/useCases/checkIn/CheckInsUseCase'
import GymsRepositoryInterface from '@/repositories/GymsRepositoryInterface'
import { InMemoryGymsRepository } from '@/repositories/memory/InMemoryGymsRepository'
import { Gym } from '../../../generated/prisma/client'

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
      latitude: 0,
      longitude: 0,
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
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on the same day', async () => {
    vi.setSystemTime(new Date(2025, 1, 2))

    await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(async () => {
      await sut.execute({
        gymId: gym.id,
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in on different days', async () => {
    vi.setSystemTime(new Date(2025, 1, 2))

    await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2026, 1, 5))

    const { checkIn } = await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
