import { UserCreateInput } from '../../../generated/prisma/models/User'
import { User } from '../../../generated/prisma/client'
import UsersRepositoryInterface from '@/repositories/UsersRepositoryInterface'

export default class InMemoryUsersRepository implements UsersRepositoryInterface {
  public itens: User[] = []

  async create(data: UserCreateInput) {
    const user: User = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
    }

    this.itens.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.itens.find((item) => item.email === email)

    return user || null
  }

  async findById(id: string) {
    const user = this.itens.find((item) => item.id === id)

    return user || null
  }
}
