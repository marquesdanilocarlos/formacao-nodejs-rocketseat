import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import 'dotenv/config'
import app from '@/app'
import createAndAuthUser from '@/test/create-and-auth-user'

describe('Create Gym e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a Gym', async () => {
    const { token } = await createAndAuthUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JS gym',
        description: 'Academia de JS',
        phone: '61999100122',
        latitude: -15.4471073,
        longitude: -47.6196255,
      })

    expect(response.statusCode).toBe(201)
  })
})
