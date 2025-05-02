import {Readable} from "node:stream";

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

new OneToHundredStream().pipe(process.stdout);