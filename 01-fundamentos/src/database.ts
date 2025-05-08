import fs from 'node:fs/promises';

export default class Database {
    #database: DB = {};
    #dbPath: URL = new URL('../db.json', import.meta.url);

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

    select<T extends keyof DB>(table: T): object[] {
        return this.#database[table] ?? [];
    }

    insert<T extends keyof DB>(table: T, data: UserData): object | undefined {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }

        this.#persist();

        return data;
    }

    delete<T extends keyof DB>(table: T, id: string) {
        const rowIndex: number | undefined = this.#database[table]?.findIndex(row => row.id === id);

        if (rowIndex !== undefined && rowIndex > -1) {
            this.#database[table]?.splice(rowIndex, 1);
            this.#persist();
        }
    }
}