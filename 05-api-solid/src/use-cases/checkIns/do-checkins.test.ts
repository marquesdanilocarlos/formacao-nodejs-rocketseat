import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import InMemoryCheckinsRepository from '@/repositories/memory/in-memory-checkins.repository'
import DoCheckin from '@/use-cases/checkIns/do-checkin'
import GymsRepository from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/memory/in-memory-gyms.repository'
import { Gym } from '../../../generated/prisma/client'
import MaxCheckinsError from '@/errors/max-checkins.error'
import MaxDistanceError from '@/errors/max-distance.error'

describe('CheckIn Use Case', () => {
  let checkInsRepository: InMemoryCheckinsRepository
  let gymsRepository: GymsRepository
  let sut: DoCheckin
  let gym: Gym

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new DoCheckin(checkInsRepository, gymsRepository)

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
    }).rejects.toBeInstanceOf(MaxCheckinsError)
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
