import { FastifyInstance } from 'fastify'
import AuthenticateController from '@/controllers/authenticate.controller'

const authenticateController = new AuthenticateController()

export default function authenticateRoutes(app: FastifyInstance) {
  app.post('/', authenticateController.authenticate)
}
