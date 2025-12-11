import { FastifyInstance } from 'fastify'
import AuthenticateControllerFactory from '@/factories/AuthenticateControllerFactory'

const authenticateController = AuthenticateControllerFactory()

export default function authenticateRoutes(app: FastifyInstance) {
  app.post('/', authenticateController.authenticate)
}
