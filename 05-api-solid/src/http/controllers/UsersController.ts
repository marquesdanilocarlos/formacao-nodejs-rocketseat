import { FastifyReply, FastifyRequest } from 'fastify'
import { createUserSchema } from '@/validators/usersValidator'
import CreateUseCase from "@/useCases/users/CreateUseCase";
import PrismaUsersRepository from "@/repositories/PrismaUsersRepository";

export default class UsersController {
  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { name, email, password } = createUserSchema.parse(request.body)

    try {
      const usersRepository = new PrismaUsersRepository();
      const createUseCase = new CreateUseCase(usersRepository);
      await createUseCase.execute({ name, email, password })
    } catch (error) {
      reply.status(409).send()
    }

    reply.status(201).send()
  }
}
