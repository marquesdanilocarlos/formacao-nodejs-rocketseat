import { UserCreateInput } from '../../generated/prisma/models/User'
import { User } from '../../generated/prisma/client'

interface UsersRepository {
  create(data: UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}

export default UsersRepository
