import { test, expect, beforeAll, afterAll } from 'vitest';
import app from '../src/app';

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

test('criar uma transação', async () => {
  const response = await app.inject({
    method: 'POST',
    url: '/transactions',
    payload: {
      title: 'New transaction',
      amount: 5000,
      type: 'credit',
    },
  });

  console.log(response.statusCode);

  expect(response.statusCode).toBe(201);
});
