import Fastify from 'fastify'
import routes from '@/routes'
import { ZodError } from 'zod'
import { envSchema } from '@/validations/env.validator'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

const app = Fastify()

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: envSchema.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
})

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    const errors = error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }))
    return reply.status(400).send({ errors })
  }

  if (envSchema.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Send error to Sentry
  }

  return reply.status(500).send({ message: 'Internal server error' })
})

export default app
