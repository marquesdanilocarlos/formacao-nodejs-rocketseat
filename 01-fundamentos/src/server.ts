import http, {IncomingMessage, Server, ServerResponse} from 'node:http';

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse): ServerResponse => {
    const  {method, url} = req;

    if (method === 'GET' && url === '/users') {
        return res.end('Listagem de usuários');
    }

    if (method === 'POST' && url === '/users') {
        return res.end('Criação de usuários');
    }

    return res.end('Hello World!');
});

server.listen(3000);