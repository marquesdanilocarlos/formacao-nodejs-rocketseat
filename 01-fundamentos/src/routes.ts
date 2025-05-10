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
            const {search} = req.query;
            const users = database.select('users', search ? {
                name: search,
                email: search
            } : null);
            return res
                .setHeader('Content-Type', 'application/json')
                .writeHead(200)
                .end(JSON.stringify(users));
        }
    },
    {
        path: buildRoutePath('/users'),
        method: 'POST',
        handler: (req: IncomingMessage, res: ServerResponse): ServerResponse => {

            if (!req.body) {
                return res.writeHead(400).end();
            }

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

            if (!req.params?.id) {
                return res.writeHead(400).end();
            }

            const {id} = req.params;
            database.delete('users', id);
            return res.writeHead(204).end();
        }
    },
    {
        path: buildRoutePath('/users/:id'),
        method: 'PUT',
        handler: (req: IncomingMessage, res: ServerResponse): ServerResponse => {

            if (!req.params?.id || !req.body) {
                return res.writeHead(400).end();
            }

            const {id} = req.params;
            const {name, email} = req.body;
            database.update('users', id, {name, email});
            return res.writeHead(204).end();
        }
    }
];

export default routes;