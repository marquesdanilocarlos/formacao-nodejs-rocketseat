import http, {IncomingMessage, Server, ServerResponse} from 'node:http';

const users: Array<Object> = [];

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse): ServerResponse => {
    const  {method, url} = req;

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'Diego',
            email: '5P6mT@example.com'
        });
        return res.end('Criação de usuários');
    }

    return res.end('Hello World!');
});

server.listen(3000);