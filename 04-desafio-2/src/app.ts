import Fastify from 'fastify';
import routes from '@/routes';
import { fastifyCookie } from '@fastify/cookie';

const app = Fastify();

app.register(fastifyCookie);
app.register(routes);

export default app;
