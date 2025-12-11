import { expect, describe, it, beforeEach } from 'vitest'
import UsersService from '@/services/UsersService'
import { compare } from 'bcryptjs'
import InMemoryUsersRepository from '@/repositories/memory/InMemoryUsersRepository'
import UserExistsError from '@/errors/UserExistsError'

describe('Register Service', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: UsersService

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UsersService(usersRepository)
  })

  it('should be user password hashed on registration', async () => {
    const { user } = await sut.register({
      name: 'Danilovisk',
      email: 'marquesdanilocarlos@gmail.com',
      password: 'a8df56412',
    })

    const isPasswordHashed = await compare('a8df56412', user.passwordHash)
    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'marquesdanilocarlos@gmail.com'
    const newUser = {
      name: 'Danilovisk',
      email,
      password: 'a8df56412',
    }

    await sut.register(newUser)

    expect(async () => {
      await sut.register(newUser)
    }).rejects.toBeInstanceOf(UserExistsError)
  })

  it('should be able to register', async () => {
    const { user } = await sut.register({
      name: 'Danilovisk',
      email: 'marquesdanilocarlos@gmail.com',
      password: 'a8df56412',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
