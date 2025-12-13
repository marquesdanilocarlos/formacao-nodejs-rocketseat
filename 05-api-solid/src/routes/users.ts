import { FastifyInstance } from 'fastify'
import RegisterController from '@/controllers/register.controller'

const registerController = RegisterController

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/', registerController)
}
