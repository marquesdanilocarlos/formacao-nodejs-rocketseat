import { Prisma, User } from '@prisma/client'

export default interface UsersRepositoryInterface {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User>
}