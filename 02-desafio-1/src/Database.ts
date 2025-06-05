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

    read<T extends keyof DB>(table: T, search?: Partial<TaskData>): TaskData[] {
        let data = this.#data[table] ?? [];

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    value = value instanceof String ? value.toLowerCase() : String(value);
                    return String(row[key as keyof typeof row]).toLowerCase().includes(value);
                })
            });
        }

        return data;
    }

    async delete(): Promise<void> {

    }
}