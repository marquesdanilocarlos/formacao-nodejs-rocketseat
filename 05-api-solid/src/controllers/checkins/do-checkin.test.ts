import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import 'dotenv/config'
import app from '@/app'
import createAndAuthUser from '@/test/create-and-auth-user'

describe('Create Checkin e2e', () => {
  beforeAll(async () => {
    await app.ready()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-10T00:00:00.000Z'))
  })

  afterAll(async () => {
    await app.close()
    vi.useRealTimers()
  })

  it('Should be able to create a Checkin', async () => {
    const { token } = await createAndAuthUser(app)

    const gym = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New gym',
        description: 'Nova academia',
        phone: '61999100165',
        latitude: -15.4471088,
        longitude: -47.6196266,
      })

    const response = await request(app.server)
      .post(`/checkins/gym/${gym.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -15.4471088,
        longitude: -47.6196266,
      })

    expect(response.statusCode).toBe(201)
  })
})
