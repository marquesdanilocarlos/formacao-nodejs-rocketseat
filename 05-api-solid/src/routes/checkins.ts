import { FastifyInstance } from 'fastify'
import ensureAuthenticated from '@/middlewares/ensure-authenticated'
import DoCheckinController from '@/controllers/checkins/do-checkin.controller'

export default function checkinsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', ensureAuthenticated)
  app.post('/gym/:gymId', DoCheckinController)
  /* app.post('/history')
  app.post('/validate')
  app.post('/metrics') */
}
