import { FastifyInstance } from 'fastify'
import UsersControllerFactory from '@/factories/UsersControllerFactory'

const usersController = UsersControllerFactory()

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/', usersController.register)
}
