import app from '@/app'
import { env } from '@/validations/env'

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running!')
  })
