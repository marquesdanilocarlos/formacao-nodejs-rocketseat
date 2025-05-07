import fs from 'node:fs/promises';

interface DB {
    users?: object[];
}

export default class Database {
    #database: DB = {};
    #dbPath: URL  = new URL('../db.json', import.meta.url);

    constructor() {
        fs.readFile(this.#dbPath, 'utf-8').then(data => {
            this.#database = JSON.parse(data);
        }).catch(
            () => {
                this.#persist();
            }
        )
    }

    #persist() {
        fs.writeFile(this.#dbPath, JSON.stringify(this.#database));
    }

    select<K extends keyof DB>(table: K): object[] {
        return this.#database[table] ?? [];
    }

    insert<K extends keyof DB>(table: K, data: object): object | undefined {
        if (Array.isArray(this.#database[table])){
            this.#database[table].push(data);
            return;
        }

        this.#database[table] = [data];
        this.#persist();

        return data;
    }
}