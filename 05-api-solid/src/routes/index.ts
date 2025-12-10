import { FastifyInstance } from 'fastify'
import usersRoutes from '@/routes/users'

export default function routes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/users' })
}
