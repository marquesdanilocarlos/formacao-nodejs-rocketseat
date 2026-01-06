import { FastifyInstance } from 'fastify'
import ensureAuthenticated from '@/middlewares/ensure-authenticated'
import DoCheckinController from '@/controllers/checkins/do-checkin.controller'
import HistoryController from '@/controllers/checkins/history.controller'
import MetricsController from '@/controllers/checkins/metrics.controller'
import ValidateController from '@/controllers/checkins/validate.controller'

export default function checkinsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', ensureAuthenticated)
  app.post('/gym/:gymId', DoCheckinController)
  app.get('/history', HistoryController)
  app.get('/metrics', MetricsController)
  app.patch('/:checkInId/validate', ValidateController)
}
