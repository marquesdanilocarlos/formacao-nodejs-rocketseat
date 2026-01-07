import { FastifyInstance } from 'fastify'
import request from 'supertest'

export default async function createAndAuthUser(app: FastifyInstance) {
  const userData = {
    name: 'John Doe to authenticate',
    email: 'john.auth@example.com',
    password: '123456',
  }

  const user = await request(app.server).post('/users').send(userData)
  const { name: _, ...authData } = userData

  const authResponse = await request(app.server).post('/auth').send(authData)
  const { token } = authResponse.body

  return { token }
}
