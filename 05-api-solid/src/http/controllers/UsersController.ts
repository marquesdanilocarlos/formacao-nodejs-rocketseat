import { FastifyReply, FastifyRequest } from 'fastify'
import { createUserSchema } from '@/validators/usersValidator'
import prisma from '../../../prisma/prisma'

export default class UsersController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = createUserSchema.parse(request.body)
    await prisma.user.create({
      data: {
        name,
        email,
        password_hash: password,
      },
    })

    reply.status(201).send()
  }
}
