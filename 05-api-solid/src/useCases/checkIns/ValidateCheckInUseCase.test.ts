import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import InMemoryCheckInsRepository from '@/repositories/memory/InMemoryCheckInsRepository'
import ValidateCheckInUseCase from '@/useCases/checkIns/ValidateCheckInUseCase'
import ResourceNotFoundError from '@/errors/ResourceNotFoundError'

describe('CheckIn Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: ValidateCheckInUseCase

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    // vi.useFakeTimers()
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
})
