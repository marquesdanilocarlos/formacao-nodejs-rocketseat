import {Readable} from "node:stream";


class OneToHundredStream extends Readable
{
    public index: number = 1;

    _read()
    {
        const i: number = this.index++;

        setTimeout(() => {
            if (i > 5) {
                this.push(null);
            } else {
                this.push(String(i));
            }
        }, 1000);
    }
}

fetch('http://localhost:4000', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half'
}).then(res => {
    return res.text()
}).then(data => {
    console.log(data);
});