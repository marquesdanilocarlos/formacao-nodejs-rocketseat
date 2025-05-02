import http, {IncomingMessage, Server, ServerResponse} from 'node:http';
import Stream from "node:stream";

const users: Array<Object> = [];

const server: Server = http.createServer(async (req: IncomingMessage, res: ServerResponse): Promise<Stream> => {
    const  {method, url} = req;

    const buffers: Buffer[] = [];
    let streamContent = null;

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    if (buffers.length) {
        streamContent = JSON.parse(Buffer.concat(buffers).toString());
    }

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .writeHead(200)
            .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        if (streamContent) {
            const {name, email} = streamContent;
            users.push({
                id: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
                name,
                email
            });
        }
        return res.writeHead(201).end();
    }

    return res.writeHead(404).end();
});

server.listen(3000);