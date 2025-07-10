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
});
