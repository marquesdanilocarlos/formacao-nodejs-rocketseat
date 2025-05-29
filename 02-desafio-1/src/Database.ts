import fs from 'fs/promises';

export default class Database {
    #data: DB = {};
    #dbPath = new URL('../db.json', import.meta.url);

    constructor() {
        fs.readFile(this.#dbPath, 'utf-8').then(data => {
            this.#data = JSON.parse(data);
        }).catch(() => {
            this.#persist();
        });
    }

    async #persist(): Promise<void> {
        await fs.writeFile(this.#dbPath, JSON.stringify(this.#data));
    }

    async create<T extends keyof DB>(table: T, data: TaskData): Promise<void> {

        if (Array.isArray(this.#data[table])) {
            this.#data[table].push(data);
        } else {
            this.#data[table] = [data];
        }

        await this.#persist();
    }

    async update(): Promise<void> {

    }

    async read(): Promise<void> {

    }

    async delete(): Promise<void> {

    }
}