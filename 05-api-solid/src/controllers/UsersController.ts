import { z } from 'zod/index'
import prisma from '@/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export default class UsersController {
  async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.email(),
      password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password,
      },
    })

    return reply.status(201).send()
  }
}
