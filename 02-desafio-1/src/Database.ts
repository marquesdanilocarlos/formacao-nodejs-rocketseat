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

    async update<T extends keyof DB>(table: T, id: string, data: Partial<TaskData>): Promise<void> {
        const rowIndex: number | undefined = this.#data[table]?.findIndex(task => task.id === id);

        if (rowIndex != undefined && rowIndex > -1 && Array.isArray(this.#data[table])) {
            let task: TaskData = this.#data[table][rowIndex];
            this.#data[table][rowIndex] = {...task, ...data};
            await this.#persist();
        }
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

    async delete<T extends keyof DB>(table: T, id: string): Promise<void> {
        const rowIndex = this.#data[table]?.findIndex(task => task.id === id);

        if (rowIndex != undefined && rowIndex > -1 && Array.isArray(this.#data[table])) {
            this.#data[table].splice(rowIndex, 1);
            this.#persist();
        }
    }
}