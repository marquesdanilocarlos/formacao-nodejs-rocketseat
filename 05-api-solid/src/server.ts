import app from '@/app'
import { envSchema } from '@/validations/env.validator'

app
  .listen({
    port: envSchema.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running!')
  })
