import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/memory/in-memory-gyms.repository'
import SearchNearbyGyms from '@/useCases/gyms/search-nearby-gyms'

describe('Search near by gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: SearchNearbyGyms

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchNearbyGyms(gymsRepository)
  })

  it('should be able to search near by gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'Near Gym',
      phone: '123456789',
      latitude: -15.4471074,
      longitude: -47.6196256,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'Far Gym',
      phone: '123456789',
      latitude: -15.6239253,
      longitude: -47.6656674,
    })

    const { gyms } = await sut.execute({
      userLatitude: -15.4565255,
      userLongitude: -47.619821,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
