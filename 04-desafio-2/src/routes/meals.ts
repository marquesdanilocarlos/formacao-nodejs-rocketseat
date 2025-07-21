import { FastifyInstance } from 'fastify';
import MealsController from '@/controllers/MealsController';
import checkSessionId from '@/middlewares/checkSessionId';

const mealsController = new MealsController();

export default async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', checkSessionId);

  app.get('/', mealsController.index);
  app.get('/:id', mealsController.show);
  app.post('/', mealsController.create);
  app.put('/:id', mealsController.update);
  app.delete('/:id', mealsController.delete);
}
