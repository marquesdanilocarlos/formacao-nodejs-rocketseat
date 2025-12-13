import { FastifyInstance } from 'fastify'
import AuthenticateController from '@/controllers/authenticate.controller'

const authenticateController = AuthenticateController

export default function authenticateRoutes(app: FastifyInstance) {
  app.post('/', authenticateController)
}
