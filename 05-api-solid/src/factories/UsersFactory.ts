import UsersService from '@/services/UsersService'
import UserController from '@/controllers/UsersController'
import PrismaUsersRepository from '@/repositories/PrismaUsersRepository'

export default function UsersFactory() {
  const usersRepository = new PrismaUsersRepository()
  const userService = new UsersService(usersRepository)
  return UserController(userService)
}
