export default class Database {
    #database: any = {};

    select(table: string): object[] {
        return this.#database[table] ?? [];
    }

    insert(table: string, data: object): object | undefined {
        if (Array.isArray(this.#database[table])){
            this.#database[table].push(data);
            return;
        }

        this.#database[table] = [data];

        return data;
    }
}