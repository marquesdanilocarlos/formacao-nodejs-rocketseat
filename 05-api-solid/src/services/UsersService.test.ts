import { expect, describe, it } from 'vitest'
import UsersService from '@/services/UsersService'
import { compare } from 'bcryptjs'

describe('Register Service', () => {
  it('should be user password hashed on registration', async () => {
    const usersService = new UsersService({
      create: (data) => {
        return Promise.resolve({
          id: 'user-1',
          name: data.name,
          email: data.email,
          passwordHash: data.passwordHash,
          createdAt: new Date(),
        })
      },
      findByEmail: () => Promise.resolve(null),
    })

    const { user } = await usersService.register({
      name: 'Danilovisk',
      email: 'marquesdanilocarlos@gmail.com',
      password: 'a8df56412',
    })

    const isPasswordHashed = await compare('a8df56412', user.passwordHash)
    expect(isPasswordHashed).toBe(true)
  })
})
