import { FastifyInstance } from 'fastify';
import UsersController from '@/controllers/UsersController';

const usersController = new UsersController();

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/login', usersController.login);
  app.post('/', usersController.create);
}
