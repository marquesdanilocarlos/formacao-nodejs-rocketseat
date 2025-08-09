import prisma from '../../prisma/prisma'
import { Prisma } from '@prisma/client'

export default class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    await prisma.user.create({
      data,
    })
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
}
