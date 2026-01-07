import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import 'dotenv/config'
import app from '@/app'
import createAndAuthUser from '@/test/create-and-auth-user'
import { prisma } from '@/prisma-e2e'

describe('Checkin Metrics e2e', () => {
  beforeAll(async () => {
    await app.ready()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-02-10T00:00:00.000Z'))
  })

  afterAll(async () => {
    await app.close()
    vi.useRealTimers()
  })

  it('Should be able to get checkin metrics', async () => {
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

    const checkin = await request(app.server)
      .post(`/checkins/gym/${gym.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -15.4471087,
        longitude: -47.6196265,
      })

    const response = await request(app.server)
      .patch(`/checkins/${checkin.body.checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(204)

    const validatedCheckin = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkin.body.checkIn.id,
      },
    })

    expect(validatedCheckin.isValidated).toEqual(expect.any(Date))
  })
})
