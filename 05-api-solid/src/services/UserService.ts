import prisma from '@/prisma'
import { hash } from 'bcryptjs'

interface UserRegisterRequest {
  name: string
  email: string
  password: string
}

export default class UserService {
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

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    })
  }
}
