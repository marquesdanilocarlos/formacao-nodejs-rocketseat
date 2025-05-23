import fs from 'fs/promises';

export default class Database {
    #data: DB = {};
    #dbPath = new URL('../db.json', import.meta.url);

    constructor() {
        try {
            fs.readFile(this.#dbPath, 'utf-8').then(data => {
                this.#data = JSON.parse(data);
            });
        } catch {
            this.#persist();
        }
    }

    async #persist(): Promise<void> {
        await fs.writeFile(this.#dbPath, JSON.stringify(this.#data));
    }

    async create(): Promise<void> {

    }

    async update(): Promise<void> {

    }

    async read(): Promise<void> {

    }

    async delete(): Promise<void> {

    }
}