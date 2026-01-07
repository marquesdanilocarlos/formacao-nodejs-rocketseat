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

  it('Should be able to list nearby Gyms', async () => {
    const { token } = await createAndAuthUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Marques gym',
        description: 'Academia de TS',
        phone: '61999100133',
        latitude: -16.6239253,
        longitude: -48.6656674,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -16.6239253,
        longitude: -48.6656674,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })
})
