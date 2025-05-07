import {IncomingMessage, ServerResponse} from "node:http";
import Database from "@/database";
import {randomUUID} from "node:crypto";
import {Route} from "@/types/route";

const database = new Database();

const routes: Route[] = [
    {
        path: '/users',
        method: 'GET',
        handler: (req: IncomingMessage, res: ServerResponse): ServerResponse => {
            return res
                .setHeader('Content-Type', 'application/json')
                .writeHead(200)
                .end(JSON.stringify(database.select('users')));
        }
    },
    {
        path: '/users',
        method: 'POST',
        handler: (req: IncomingMessage, res: ServerResponse): ServerResponse => {
            const {name, email} = req.body;
            database.insert('users', {
                id: randomUUID(),
                name,
                email
            })

            return res.writeHead(201).end();
        }
    }
];

export default routes;