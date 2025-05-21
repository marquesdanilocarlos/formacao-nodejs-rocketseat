import {IncomingMessage, ServerResponse} from "node:http";

export default async function json(req: IncomingMessage, res: ServerResponse): Promise<any> {
    const buffers: Buffer[] = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        req.body = null;
    }
};