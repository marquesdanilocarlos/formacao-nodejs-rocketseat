import prisma from '@/prisma'
import { UserCreateInput } from '../../../generated/prisma/models/User'
import UsersRepositoryInterface from '@/repositories/UsersRepositoryInterface'

export default class PrismaUsersRepository implements UsersRepositoryInterface {
  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }
}
