import fastify from 'fastify';
import {knexInstance} from "@/database";

const app = fastify();

app.get('/hello', async () => {
    const test = await knexInstance('sqlite_schema').select('*');
    console.log(test);
});

app
    .listen({
        port: 3000,
    })
    .then(() => {
        console.log('Server is running');
    })
