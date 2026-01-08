import { FastifyInstance } from 'fastify'
import usersRoutes from '@/routes/users'
import authenticateRoutes from '@/routes/authenticate'
import gymsRoutes from '@/routes/gyms'
import checkinsRoutes from '@/routes/checkins'

export default function routes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/users' })
  app.register(authenticateRoutes, { prefix: '/auth' })
  app.register(gymsRoutes, { prefix: '/gyms' })
  app.register(checkinsRoutes, { prefix: '/checkins' })
}
