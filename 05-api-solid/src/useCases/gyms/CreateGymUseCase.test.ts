import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/memory/InMemoryGymsRepository'
import CreateGymUseCase from '@/useCases/gyms/CreateGymUseCase'

describe('Create Gym Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: CreateGymUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym 01',
      description: 'Description 01',
      phone: '123456789',
      latitude: -15.4471074,
      longitude: -47.6196256,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
