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

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    req
        .pipe(new InvertNumberStream())
        .pipe(res)
});

server.listen(4000);