import { test, expect, beforeAll, afterAll, describe, beforeEach } from 'vitest';
import app from '../src/app';
import { execSync } from 'node:child_process';

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all');
    execSync('npm run knex migrate:latest');
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

    expect(response.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'New transaction',
          amount: 5000,
        }),
      ])
    );
  });

  test('get a specific transaction', async () => {
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

    const listResponse = await app.inject({
      method: 'GET',
      url: '/transactions',
      headers: {
        Cookie: sessionCookie,
      },
    });

    const transactionId = listResponse.json()[0].id;

    const response = await app.inject({
      method: 'GET',
      url: `/transactions/${transactionId}`,
      headers: {
        Cookie: sessionCookie,
      },
    });

    expect(response.json()).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      })
    );
  });

  test('summary transactions', async () => {
    const createResponse = await app.inject({
      method: 'POST',
      url: '/transactions',
      payload: {
        title: 'New transaction credit',
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

    const newCreateResponse = await app.inject({
      method: 'POST',
      url: '/transactions',
      payload: {
        title: 'New transaction debit',
        amount: 2000,
        type: 'debit',
      },
      headers: {
        Cookie: sessionCookie,
      },
    });

    const response = await app.inject({
      method: 'GET',
      url: '/transactions/summary',
      headers: {
        Cookie: sessionCookie,
      },
    });

    expect(response.json()).toEqual(
      expect.objectContaining({
        amount: 3000,
      })
    );
  });
});
