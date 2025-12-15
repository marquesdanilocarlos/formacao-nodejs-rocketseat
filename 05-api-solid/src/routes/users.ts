import { FastifyInstance } from 'fastify'
import RegisterController from '@/controllers/register.controller'
import ProfileController from '@/controllers/profile.controller'
import ensureAuthenticated from '@/middlewares/ensure-authenticated'

const registerController = RegisterController
const profileController = ProfileController

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/', registerController)
  app.get('/me', { onRequest: [ensureAuthenticated] }, profileController)
}
