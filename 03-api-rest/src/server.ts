import fastify, { FastifyInstance } from 'fastify';
import env from '@/validation/env';
import routes from './routes';

const app: FastifyInstance = fastify();

app.register(routes);

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running');
  });

export default app;
