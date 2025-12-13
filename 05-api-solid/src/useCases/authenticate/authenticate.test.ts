import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import InMemoryUsersRepository from '@/repositories/memory/in-memory-users.repository'
import Authenticate from '@/useCases/authenticate/authenticate'
import InvalidCredentialsError from '@/errors/invalid-credentials.error'

describe('Authenticate Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: Authenticate

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new Authenticate(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Danilovisk',
      email: 'marquesdanilocarlos@gmail.com',
      passwordHash: await hash('a8df56412', 6),
    })

    const { user } = await sut.execute({
      email: 'marquesdanilocarlos@gmail.com',
      password: 'a8df56412',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(async () => {
      await sut.execute({
        email: 'marquesdanilocarlos@gmail.com',
        password: 'a8df56412',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Danilovisk',
      email: 'marquesdanilocarlos@gmail.com',
      passwordHash: await hash('a8df56412', 6),
    })

    await expect(async () => {
      await sut.execute({
        email: 'marquesdanilocarlos@gmail.com',
        password: '98765afsdf5421',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
