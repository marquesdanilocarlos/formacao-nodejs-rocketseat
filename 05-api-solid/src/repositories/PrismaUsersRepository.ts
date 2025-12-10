import prisma from '@/prisma'
import { UserCreateInput } from '../../generated/prisma/models/User'

export default class PrismaUsersRepository {
  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
