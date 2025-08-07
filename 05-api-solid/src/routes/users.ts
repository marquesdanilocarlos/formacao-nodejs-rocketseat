import { FastifyInstance } from 'fastify'
import UsersController from '@/http/controllers/UsersController'

const usersController = new UsersController()

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/', usersController.create)
}
