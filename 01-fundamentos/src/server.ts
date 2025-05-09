import http, {IncomingMessage, Server, ServerResponse} from 'node:http';
import json from "@/middlewares/json";
import routes from "@/routes";
import {Route} from "@/types/route";
import extractQueryParams from "@/utils/extractQueryParams";

const server: Server = http.createServer(async (req: IncomingMessage, res: ServerResponse): Promise<ServerResponse> => {
    const {method, url} = req;

    await json(req, res);

    const route: Route | undefined = routes.find(route => {
        return route.method === method && route.path.test(url || '');
    });

    if (route) {
        const routeParams: RegExpMatchArray | null | undefined = req.url?.match(route.path);
        const {query, ...params} = routeParams?.groups;
        req.params = params;
        req.query = query ? extractQueryParams(query) : {};
        return route.handler(req, res);
    }

    return res.writeHead(404).end();
});

server.listen(3000);