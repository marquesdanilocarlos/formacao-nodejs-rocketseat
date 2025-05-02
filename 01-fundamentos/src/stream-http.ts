import http, {IncomingMessage, Server, ServerResponse} from "node:http";
import {Transform, TransformCallback} from "node:stream";

class InvertNumberStream extends Transform {
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        const transformed = Number(chunk.toString()) * -1;
        console.log(transformed);
        callback(null, String(transformed));
    }
}

//req: Readable Stream
//res: Writable Stream

const server: Server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    /*req
        .pipe(new InvertNumberStream())
        .pipe(res)*/

    const buffers: Buffer[] = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const fullStreamContent = Buffer.concat(buffers).toString();

    console.log(fullStreamContent);

    res.end(fullStreamContent);
});

server.listen(4000);