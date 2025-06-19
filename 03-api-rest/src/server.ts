import fastify from 'fastify';
import { knexInstance } from '@/database';
import env from '@/validation/env';

const app = fastify();

app.get('/hello', async () => {
  const transaction = await knexInstance('transactions')
    .select('*')
    .where('amount', '>', 100)
    .groupBy('id');

  return { transaction };
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running');
  });
