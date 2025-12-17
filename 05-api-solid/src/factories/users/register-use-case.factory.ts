import Register from '@/use-cases/users/register'
import PrismaUsersRepository from '@/repositories/prisma/prisma-users.repository'

export default function RegisterUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository()
  return new Register(usersRepository)
}
