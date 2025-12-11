import PrismaUsersRepository from '@/repositories/prisma/PrismaUsersRepository'
import AuthenticateUseCase from '@/useCases/authenticate/AuthenticateUseCase'
import AuthenticateController from '@/controllers/AuthenticateController'

export default function AuthenticateControllerFactory() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateUseCase(usersRepository)
  return AuthenticateController(authenticateService)
}
