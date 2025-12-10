import { UserCreateInput } from '../../generated/prisma/models/User'
import { User } from '../../generated/prisma/client'

interface UsersRepositoryInterface {
  create(data: UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
}

export default UsersRepositoryInterface
