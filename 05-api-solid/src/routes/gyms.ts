import { FastifyInstance } from 'fastify'
import ensureAuthenticated from '@/middlewares/ensure-authenticated'
import CreateController from '@/controllers/gyms/create.controller'
import SearchController from '@/controllers/gyms/search.controller'
import NearbyController from '@/controllers/gyms/nearby.controller'
import verifyUserRole from '@/middlewares/verify-user-role'

export default async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', ensureAuthenticated)
  app.post('/', { onRequest: [verifyUserRole('ADMIN')] }, CreateController)
  app.get('/search', SearchController)
  app.get('/nearby', NearbyController)
}
