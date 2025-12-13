import Fastify from 'fastify'
import routes from '@/routes'
import { ZodError } from 'zod'
import { envSchema } from '@/validations/env.validator'

const app = Fastify()

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
