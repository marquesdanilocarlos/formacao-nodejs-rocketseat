import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import 'dotenv/config'
import app from '@/app'
import createAndAuthUser from '@/test/create-and-auth-user'

describe('History Checkin e2e', () => {
  beforeAll(async () => {
    await app.ready()
    vi.useFakeTimers()
  })

  afterAll(async () => {
    await app.close()
    vi.useRealTimers()
  })

  it('Should be able to list a checkin history', async () => {
    const { token } = await createAndAuthUser(app)

    const gym = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Space Gym',
        description: 'Space academia',
        phone: '61999100165',
        latitude: -15.4471088,
        longitude: -47.6196266,
      })

    await request(app.server)
      .post(`/checkins/gym/${gym.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -15.4471087,
        longitude: -47.6196265,
      })

    const response = await request(app.server)
      .get(`/checkins/history`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })
})
