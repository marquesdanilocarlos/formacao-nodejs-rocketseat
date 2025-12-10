import { FastifyInstance } from 'fastify'
import UsersFactory from '@/factories/UsersFactory'

const usersController = UsersFactory()

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/', usersController.register)
}
