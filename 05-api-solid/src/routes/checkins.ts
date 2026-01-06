import { FastifyInstance } from 'fastify'
import ensureAuthenticated from '@/middlewares/ensure-authenticated'
import DoCheckinController from '@/controllers/checkins/do-checkin.controller'
import HistoryController from '@/controllers/checkins/history.controller'

export default function checkinsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', ensureAuthenticated)
  app.post('/gym/:gymId', DoCheckinController)
  app.get('/history', HistoryController)
  /* app.post('/validate')
  app.post('/metrics') */
}
