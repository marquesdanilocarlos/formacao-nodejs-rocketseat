import { FastifyInstance } from 'fastify'
import usersRoutes from '@/routes/users'
import authenticateRoutes from '@/routes/authenticate'

export default function routes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/users' })
  app.register(authenticateRoutes, { prefix: '/auth' })
}
