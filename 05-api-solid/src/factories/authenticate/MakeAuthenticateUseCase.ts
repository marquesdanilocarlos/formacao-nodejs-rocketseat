import PrismaUsersRepository from '@/repositories/prisma/PrismaUsersRepository'
import AuthenticateUseCase from '@/useCases/authenticate/AuthenticateUseCase'

export default function MakeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new AuthenticateUseCase(usersRepository)
}
