import {IncomingMessage, ServerResponse} from "node:http";
import Database from "@/database";
import {randomUUID} from "node:crypto";
import {Route} from "@/types/route";
import buildRoutePath from "@/utils/buildRoutePath";

const database = new Database();

const routes: Route[] = [
    {
        path: buildRoutePath('/users'),
        method: 'GET',
        handler: (req: IncomingMessage, res: ServerResponse): ServerResponse => {
            return res
                .setHeader('Content-Type', 'application/json')
                .writeHead(200)
                .end(JSON.stringify(database.select('users')));
        }
    },
    {
        path: buildRoutePath('/users'),
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
    },
    {
        path: buildRoutePath('/users/:id'),
        method: 'DELETE',
        handler: (req: IncomingMessage, res: ServerResponse): ServerResponse => {
            const {id} = req.params.groups;
            database.delete('users', id);
            return res.writeHead(204).end();
        }
    }
];

export default routes;