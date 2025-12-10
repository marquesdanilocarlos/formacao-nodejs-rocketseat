import prisma from '@/prisma'
import { hash } from 'bcryptjs'
import PrismaUsersRepository from '@/repositories/PrismaUsersRepository'

interface UserRegisterRequest {
  name: string
  email: string
  password: string
}

export default class UsersService {
  constructor(private userRepository: PrismaUsersRepository) {}

  async register({ name, email, password }: UserRegisterRequest) {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('Email already exists')
    }

    const passwordHash = await hash(password, 6)

    await this.userRepository.create({
      name,
      email,
      passwordHash,
    })
  }
}
