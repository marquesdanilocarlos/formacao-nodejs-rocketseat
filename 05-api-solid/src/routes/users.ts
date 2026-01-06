import { FastifyInstance } from 'fastify'
import RegisterController from '@/controllers/users/register.controller'
import ProfileController from '@/controllers/users/profile.controller'
import ensureAuthenticated from '@/middlewares/ensure-authenticated'

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/', RegisterController)
  app.get('/me', { onRequest: [ensureAuthenticated] }, ProfileController)
}
