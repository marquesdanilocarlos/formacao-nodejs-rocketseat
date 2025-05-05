import {IncomingMessage, ServerResponse} from 'node:http';

export default async function json(req:IncomingMessage , res: ServerResponse): Promise<any> {
    const buffers: Buffer[] = [];
    let streamContent = null;

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    if (buffers.length) {
        streamContent = JSON.parse(Buffer.concat(buffers).toString());
    }

    return streamContent;
}