import { FastifyInstance } from 'fastify'
import AuthenticateController from '@/controllers/users/authenticate.controller'

const authenticateController = AuthenticateController

export default function authenticateRoutes(app: FastifyInstance) {
  app.post('/', authenticateController)
}
