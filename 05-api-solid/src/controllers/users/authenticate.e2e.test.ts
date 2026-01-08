import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import 'dotenv/config'
import app from '@/app'

describe('Authenticate e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authenticate', async () => {
    const userData = {
      name: 'John Doe to authenticate',
      email: 'john.doe.auth@example.com',
      password: '123456',
    }

    await request(app.server).post('/users').send(userData)
    const { email, password } = userData
    const authData = { email, password }

    const response = await request(app.server).post('/auth').send(authData)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })

  it('Should be able to refresh a token', async () => {
    const userData = {
      name: 'John Doe to refresh',
      email: 'john.doe.refresh@example.com',
      password: '123456',
    }

    await request(app.server).post('/users').send(userData)
    const { name: _, ...authData } = userData

    const authResponse = await request(app.server).post('/auth').send(authData)

    const cookies = authResponse.get('Set-Cookie') ?? []
    expect(cookies.length).toBeGreaterThan(0)

    const cookieHeader = cookies[0].split(';')[0]

    const response = await request(app.server)
      .patch('/auth/token/refresh')
      .set('Cookie', cookieHeader)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
