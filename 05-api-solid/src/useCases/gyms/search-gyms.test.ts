import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/memory/in-memory-gyms.repository'
import SearchGyms from '@/useCases/gyms/search-gyms'

describe('Search gym Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: SearchGyms

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGyms(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: 'JavaScript Gym',
      phone: '123456789',
      latitude: -15.4471074,
      longitude: -47.6196256,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: 'TypeScript Gym',
      phone: '123456789',
      latitude: -15.4471074,
      longitude: -47.6196256,
    })

    const { gyms } = await sut.execute({ query: 'Script', page: 1 })

    expect(gyms).toHaveLength(2)
  })

  it('should be able to search gyms by name and page', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript Gym ${i}`,
        description: 'TypeScript Gym',
        phone: '123456789',
        latitude: -15.4471074,
        longitude: -47.6196256,
      })
    }

    const { gyms } = await sut.execute({ query: 'Script', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScript Gym 21' }),
      expect.objectContaining({ title: 'TypeScript Gym 22' }),
    ])
  })
})
