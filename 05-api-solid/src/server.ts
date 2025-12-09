import { app } from '@/app'
import { env } from '@/validation/env'

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running!')
  })
