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

  it('Should be able to search Gyms by title', async () => {
    const { token } = await createAndAuthUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript gym',
        description: 'Academia de Javascript',
        phone: '61999100122',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript gym',
        description: 'Academia de TS',
        phone: '61999100133',
        latitude: -27.2092051,
        longitude: -49.640109,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Typescript',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body).toEqual([
      expect.objectContaining({
        title: 'Typescript gym',
      }),
    ])
  })
})
