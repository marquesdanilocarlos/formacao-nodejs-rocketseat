import { expect, describe, it } from 'vitest'
import UsersService from '@/services/UsersService'
import { compare } from 'bcryptjs'
import InMemoryUsersRepository from '@/repositories/memory/InMemoryUsersRepository'
import UserExistsError from '@/errors/UserExistsError'

describe('Register Service', () => {
  it('should be user password hashed on registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const usersService = new UsersService(usersRepository)

    const { user } = await usersService.register({
      name: 'Danilovisk',
      email: 'marquesdanilocarlos@gmail.com',
      password: 'a8df56412',
    })

    const isPasswordHashed = await compare('a8df56412', user.passwordHash)
    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const email = 'marquesdanilocarlos@gmail.com'
    const newUser = {
      name: 'Danilovisk',
      email,
      password: 'a8df56412',
    }
    const usersService = new UsersService(usersRepository)

    await usersService.register(newUser)

    expect(async () => {
      await usersService.register(newUser)
    }).rejects.toBeInstanceOf(UserExistsError)
  })

  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const usersService = new UsersService(usersRepository)

    const { user } = await usersService.register({
      name: 'Danilovisk',
      email: 'marquesdanilocarlos@gmail.com',
      password: 'a8df56412',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
