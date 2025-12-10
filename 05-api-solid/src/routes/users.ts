import UsersController from '@/controllers/UsersController'
import { FastifyInstance } from 'fastify'

const usersController = new UsersController()

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/', usersController.register)
}
