import RegisterUseCase from '@/useCases/users/RegisterUseCase'
import UserController from '@/controllers/UsersController'
import PrismaUsersRepository from '@/repositories/prisma/PrismaUsersRepository'

export default function UsersControllerFactory() {
  const usersRepository = new PrismaUsersRepository()
  const userService = new RegisterUseCase(usersRepository)
  return UserController(userService)
}
