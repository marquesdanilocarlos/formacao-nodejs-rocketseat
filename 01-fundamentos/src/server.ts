import http, {IncomingMessage, Server, ServerResponse} from 'node:http';
import Stream from "node:stream";
import json from "@/middlewares/json";
import Database from "@/database";
import {randomUUID} from "node:crypto";

const database = new Database();

const server: Server = http.createServer(async (req: IncomingMessage, res: ServerResponse): Promise<Stream> => {
    const {method, url} = req;

    const streamContent = await json(req, res);

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .writeHead(200)
            .end(JSON.stringify(database.select('users')));
    }

    if (method === 'POST' && url === '/users') {
        if (streamContent) {
            const {name, email} = streamContent;
            database.insert('users', {
                id: randomUUID(),
                name,
                email
            })
        }
        return res.writeHead(201).end();
    }

    return res.writeHead(404).end();
});

server.listen(3000);