import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/memory/in-memory-gyms.repository'
import CreateGym from '@/useCases/gyms/create-gym'

describe('Create Gym Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: CreateGym

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGym(gymsRepository)
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
