import { FastifyInstance } from 'fastify';

export default async function mealsRoutes(app: FastifyInstance) {
  app.get('/meals', async () => {
    return { meals: [] };
  });
}
