import http, {IncomingMessage, Server, ServerResponse} from 'node:http';

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse): ServerResponse => {
    return res.end('Hello World!');
});

server.listen(3000);