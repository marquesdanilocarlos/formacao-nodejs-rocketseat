import { FastifyInstance } from 'fastify'
import ensureAuthenticated from '@/middlewares/ensure-authenticated'
import CreateController from '@/controllers/gyms/create.controller'
import SearchController from '@/controllers/gyms/search.controller'
import NearbyController from '@/controllers/gyms/nearby.controller'

export default async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', ensureAuthenticated)
  app.post('/', CreateController)
  app.get('/search', SearchController)
  app.get('/nearby', NearbyController)
}
