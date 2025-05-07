import {IncomingMessage, ServerResponse} from "node:http";

interface Route {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    handler: (req: IncomingMessage, res:ServerResponse) => ServerResponse;
}