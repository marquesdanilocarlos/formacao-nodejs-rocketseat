import { FastifyInstance } from 'fastify';
import usersRoutes from '@/routes/users';
import mealsRoutes from '@/routes/meals';

export default async function routes(app: FastifyInstance) {
  app.register(usersRoutes);
  app.register(mealsRoutes);
}
