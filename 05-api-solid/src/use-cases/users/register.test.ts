import { expect, describe, it, beforeEach } from 'vitest'
import Register from '@/use-cases/users/register'
import { compare } from 'bcryptjs'
import InMemoryUsersRepository from '@/repositories/memory/in-memory-users.repository'
import UserExistsError from '@/errors/user-exists.error'

describe('Register Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: Register

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new Register(usersRepository)
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

    await expect(async () => {
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
