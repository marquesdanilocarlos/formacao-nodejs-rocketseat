import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import InMemoryUsersRepository from '@/repositories/memory/in-memory-users.repository'
import GetProfile from '@/useCases/users/get-profile'
import ResourceNotFoundError from '@/errors/resource-not-found.error'

describe('Get Profile', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: GetProfile

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetProfile(usersRepository)
  })

  it('should be able to get authenticated user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Danilovisk',
      email: 'marquesdanilocarlos@gmail.com',
      passwordHash: await hash('a8df56412', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Danilovisk')
  })

  it('should notbe able to get user profile with wrong id', async () => {
    await expect(async () => {
      await sut.execute({
        userId: 'not-existing-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
