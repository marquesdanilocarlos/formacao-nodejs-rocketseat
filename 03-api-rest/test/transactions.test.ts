import { test, expect, beforeAll, afterAll, describe } from 'vitest';
import app from '../src/app';

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('create a new transaction', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/transactions',
      payload: {
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      },
    });

    expect(response.statusCode).toBe(201);
  });

  test('list all transactions', async () => {
    const createResponse = await app.inject({
      method: 'POST',
      url: '/transactions',
      payload: {
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      },
    });

    const setCookie = createResponse.headers['set-cookie'];

    const sessionCookie = Array.isArray(setCookie)
      ? setCookie.find((c) => c.startsWith('sessionId='))
      : setCookie?.startsWith('sessionId=')
        ? setCookie
        : undefined;

    expect(sessionCookie).toBeDefined();

    const response = await app.inject({
      method: 'GET',
      url: '/transactions',
      headers: {
        Cookie: sessionCookie,
      },
    });

    console.log(typeof response.body);

    expect(response.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'New transaction',
          amount: 5000,
        }),
      ])
    );
  });
});
