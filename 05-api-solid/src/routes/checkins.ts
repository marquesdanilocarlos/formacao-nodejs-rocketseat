import { FastifyInstance } from 'fastify'
import ensureAuthenticated from '@/middlewares/ensure-authenticated'
import DoCheckinController from '@/controllers/checkins/do-checkin.controller'
import HistoryController from '@/controllers/checkins/history.controller'
import MetricsController from '@/controllers/checkins/metrics.controller'

export default function checkinsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', ensureAuthenticated)
  app.post('/gym/:gymId', DoCheckinController)
  app.get('/history', HistoryController)
  app.get('/metrics', MetricsController)
  /* app.post('/validate')
   */
}
