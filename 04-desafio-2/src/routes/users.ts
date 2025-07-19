import { FastifyInstance } from 'fastify';
import UsersController from '@/controllers/UsersController';

const usersController = new UsersController();

export default async function usersRoutes(app: FastifyInstance) {
  app.get('/', usersController.index);
  app.get('/:id', usersController.show);
  app.post('/', usersController.create);
  app.put('/:id', usersController.update);
  app.delete('/:id', usersController.delete);
}
