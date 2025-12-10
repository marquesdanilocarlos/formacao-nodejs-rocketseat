import UsersService from '@/services/UsersService'
import { FastifyInstance } from 'fastify'
import UserController from '@/controllers/UsersController'

const userService = new UsersService()
const userController = UserController(userService)

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/', userController.register)
}
