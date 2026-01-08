import { FastifyInstance } from 'fastify'
import AuthenticateController from '@/controllers/users/authenticate.controller'
import RefreshController from '@/controllers/users/refresh.controller'

export default function authenticateRoutes(app: FastifyInstance) {
  app.post('/', AuthenticateController)
  app.patch('/token/refresh', RefreshController)
}
