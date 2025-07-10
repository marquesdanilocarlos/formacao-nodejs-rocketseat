import fastify, { FastifyInstance } from 'fastify';
import routes from '@/routes';
import fastifyCookie from '@fastify/cookie';

const app: FastifyInstance = fastify();

app.register(routes);
app.register(fastifyCookie);

export default app;
