import {IncomingMessage, ServerResponse} from "node:http";
import json from "@/middlewares/json";
import routes from "@/routes";
import extractQueryParams from "@/utils/extractQueryParams";

export default async function (req: IncomingMessage, res: ServerResponse): Promise<ServerResponse> {
    const {method, url} = req;

    await json(req, res);

    console.log(method, url);

    const route: Route | undefined = routes.find(route => {
        return route.method === method && route.path.test(url || '');
    });

    if (!route) {
        return res.writeHead(404).end();
    }

    const routeParams: RegExpMatchArray | null | undefined = req.url?.match(route.path);

    if (routeParams?.groups) {

        const {query, ...params} = routeParams.groups;
        req.query = query ? extractQueryParams(query) : {};
        req.params = params;
    }

    return route.handler(req, res);
};