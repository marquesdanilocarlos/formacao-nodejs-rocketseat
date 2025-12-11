import PrismaUsersRepository from '@/repositories/prisma/PrismaUsersRepository'
import AuthenticateService from '@/services/AuthenticateService'
import AuthenticateController from '@/controllers/AuthenticateController'

export default function AuthenticateFactory() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(usersRepository)
  return AuthenticateController(authenticateService)
}
