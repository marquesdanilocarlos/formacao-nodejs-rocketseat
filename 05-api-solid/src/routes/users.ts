import UserService from '@/services/UserService'
import { FastifyInstance } from 'fastify'
import UserController from '@/controllers/UsersController'

const userService = new UserService()
const userController = UserController(userService)

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/', userController.register)
}
