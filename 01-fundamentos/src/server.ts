import http, {IncomingMessage, Server, ServerResponse} from 'node:http';

const users: Array<Object> = [];

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse): ServerResponse => {
    const  {method, url} = req;

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .writeHead(200)
            .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'Diego',
            email: '5P6mT@example.com'
        });
        return res.writeHead(201).end();
    }

    return res.writeHead(404).end();
});

server.listen(3000);