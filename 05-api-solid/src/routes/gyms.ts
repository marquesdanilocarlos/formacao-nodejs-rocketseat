import { FastifyInstance } from 'fastify'
import ensureAuthenticated from '@/middlewares/ensure-authenticated'
import CreateController from '@/controllers/gyms/create.controller'

const createController = CreateController

export default async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', ensureAuthenticated)
  app.post('/', createController)
}
