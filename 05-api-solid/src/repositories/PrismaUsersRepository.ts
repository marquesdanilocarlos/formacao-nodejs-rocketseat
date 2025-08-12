import prisma from '../../prisma/prisma'
import { Prisma, User } from '@prisma/client'
import UsersRepositoryInterface from "@/repositories/UsersRepositoryInterface";

export default class PrismaUsersRepository implements UsersRepositoryInterface{
  async create(data: Prisma.UserCreateInput): Promise<User> {
    await prisma.user.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
}
