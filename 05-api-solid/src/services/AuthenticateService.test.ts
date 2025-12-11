import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'
import InMemoryUsersRepository from '@/repositories/memory/InMemoryUsersRepository'
import AuthenticateService from '@/services/AuthenticateService'
import InvalidCredentialsError from '@/errors/InvalidCredentialsError'

describe('Authenticate Service', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    expect(async () => {
      await sut.execute({
        email: 'marquesdanilocarlos@gmail.com',
        password: 'a8df56412',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'Danilovisk',
      email: 'marquesdanilocarlos@gmail.com',
      passwordHash: await hash('a8df56412', 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'marquesdanilocarlos@gmail.com',
        password: '98765afsdf5421',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
