import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import 'dotenv/config'

let app: any

describe('Register e2e', () => {
  beforeAll(async () => {
    app = (await import('@/app')).default
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Register e2e', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doeee@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
  })
})
