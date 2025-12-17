import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import InMemoryCheckinsRepository from '@/repositories/memory/in-memory-checkins.repository'
import ValidateCheckin from '@/use-cases/checkIns/validate-checkin'
import ResourceNotFoundError from '@/errors/resource-not-found.error'
import LateCheckinError from '@/errors/late-checkin.error'

describe('CheckIn Use Case', () => {
  let checkInsRepository: InMemoryCheckinsRepository
  let sut: ValidateCheckin

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinsRepository()
    sut = new ValidateCheckin(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })

  it('should be able to validate check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.isValidated).toEqual(expect.any(Date))
    expect(checkInsRepository.itens[0].isValidated).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check in', async () => {
    await expect(async () =>
      sut.execute({
        checkInId: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const advancedMinutes = 21 * 60 * 1000

    vi.advanceTimersByTime(advancedMinutes)

    await expect(async () =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckinError)
  })
})
