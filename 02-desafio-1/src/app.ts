import {IncomingMessage, ServerResponse} from "node:http";
import json from "@/middlewares/json";

export default async function (req: IncomingMessage, res: ServerResponse): Promise<ServerResponse> {
    const {method, url} = req;

    await json(req, res);

    return res.writeHead(200).end(JSON.stringify(req.body));
};