import fastify from 'fastify';
import { knexInstance } from '@/database';

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
    port: 3000,
  })
  .then(() => {
    console.log('Server is running');
  });
