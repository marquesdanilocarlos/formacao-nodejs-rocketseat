import { UserCreateInput } from '../../../generated/prisma/models/User'
import UsersRepository from '@/repositories/users-repository'
import PrismaAbstractRepository from '@/repositories/prisma/prisma-abstract-repository'

export default class PrismaUsersRepository
  extends PrismaAbstractRepository
  implements UsersRepository
{
  constructor() {
    super()
  }

  async create(data: UserCreateInput) {
    const user = await this.prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }
}
