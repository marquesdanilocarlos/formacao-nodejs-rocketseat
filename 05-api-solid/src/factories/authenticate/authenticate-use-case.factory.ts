import PrismaUsersRepository from '@/repositories/prisma/prisma-users.repository'
import Authenticate from '@/use-cases/authenticate/authenticate'

export default function AuthenticateUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository()
  return new Authenticate(usersRepository)
}
