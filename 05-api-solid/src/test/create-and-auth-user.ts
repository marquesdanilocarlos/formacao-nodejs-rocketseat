import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '@/prisma-e2e'
import { hash } from 'bcryptjs'

export default async function createAndAuthUser(
  app: FastifyInstance,
  isAdmin: boolean = true,
) {
  const random = Math.round(Math.random() * 1000)
  await prisma.user.create({
    data: {
      name: 'John Doe to authenticate',
      email: `john.auth${random}@example.com`,
      passwordHash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server)
    .post('/auth')
    .send({
      email: `john.auth${random}@example.com`,
      password: '123456',
    })

  const { token } = authResponse.body

  return { token }
}
