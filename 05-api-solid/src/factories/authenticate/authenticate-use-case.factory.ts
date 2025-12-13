import PrismaUsersRepository from '@/repositories/prisma/prisma-users.repository'
import Authenticate from '@/useCases/authenticate/authenticate'

export default function AuthenticateUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository()
  return new Authenticate(usersRepository)
}
