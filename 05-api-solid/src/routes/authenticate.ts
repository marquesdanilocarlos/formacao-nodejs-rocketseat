import { FastifyInstance } from 'fastify'
import AuthenticateController from '@/controllers/AuthenticateController'

const authenticateController = new AuthenticateController()

export default function authenticateRoutes(app: FastifyInstance) {
  app.post('/', authenticateController.authenticate)
}
