import { z } from 'zod'
import prisma from '@/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcryptjs'

export default class UsersController {
  async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.email(),
      password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      return reply.status(409).send()
    }

    const passwordHash = await hash(password, 6)

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    })

    return reply.status(201).send()
  }
}
