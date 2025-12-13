import { FastifyInstance } from 'fastify'
import UsersController from '@/controllers/users.controller'

const usersController = new UsersController()

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/', usersController.register)
}
