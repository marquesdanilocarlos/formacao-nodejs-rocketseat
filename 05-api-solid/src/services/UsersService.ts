import prisma from '@/prisma'
import { hash } from 'bcryptjs'
import PrismaUsersRepository from '@/repositories/PrismaUsersRepository'

interface UserRegisterRequest {
  name: string
  email: string
  password: string
}

export default class UsersService {
  async register({ name, email, password }: UserRegisterRequest) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('Email alredy exists')
    }

    const passwordHash = await hash(password, 6)

    const userRepository = new PrismaUsersRepository()
    await userRepository.create({
      name,
      email,
      passwordHash,
    })
  }
}
