import {Readable, Writable} from "node:stream";

class OneToHundredStream extends Readable
{
    public index: number = 1;

    _read()
    {
        const i: number = this.index++;

        setTimeout(() => {
            if (i > 100) {
                this.push(null);
            } else {
                this.push(String(i));
            }
        }, 1000);
    }
}

class MultiplyByTenStream extends Writable
{
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
        console.log(Number(chunk) * 10);
        callback();
    }
}

new OneToHundredStream().pipe(new MultiplyByTenStream());