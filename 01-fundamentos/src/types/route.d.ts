import {IncomingMessage, ServerResponse} from "node:http";

interface Route {
    path: RegExp;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    handler: (req: IncomingMessage, res:ServerResponse) => ServerResponse;
}