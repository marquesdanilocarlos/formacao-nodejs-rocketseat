import {IncomingMessage, ServerResponse} from "node:http";
import json from "@/middlewares/json";
import routes from "@/routes";

export default async function (req: IncomingMessage, res: ServerResponse): Promise<ServerResponse> {
    const {method, url} = req;

    await json(req, res);

    const route = routes.find(route => {
        route.method === method && route.path.test(url || '');
    });

    return res.writeHead(200).end(JSON.stringify(req.body));
};