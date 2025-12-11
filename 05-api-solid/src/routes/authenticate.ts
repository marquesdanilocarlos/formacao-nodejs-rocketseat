import { FastifyInstance } from 'fastify'
import AuthenticateFactory from '@/factories/AuthenticateFactory'

const authenticateController = AuthenticateFactory()

export default function authenticateRoutes(app: FastifyInstance) {
  app.post('/', authenticateController.authenticate)
}
