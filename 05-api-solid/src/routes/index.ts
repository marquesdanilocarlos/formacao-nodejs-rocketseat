import { FastifyInstance } from 'fastify'
import usersRoutes from '@/routes/users'
import authenticateRoutes from '@/routes/authenticate'
import fastifyJwt from '@fastify/jwt'
import { envSchema } from '@/validations/env.validator'

export default function routes(app: FastifyInstance) {
  app.register(fastifyJwt, {
    secret: envSchema.JWT_SECRET,
  })
  app.register(usersRoutes, { prefix: '/users' })
  app.register(authenticateRoutes, { prefix: '/auth' })
}
