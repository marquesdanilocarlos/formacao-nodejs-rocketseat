import fs from 'fs';
import {parse} from 'csv-parse';

export default async function importCsv(filePath: URL): Promise<TaskData[]> {
    const parser = fs.createReadStream(filePath)
        .pipe(
            parse({
                delimiter: ',',
                columns: true,
                skipEmptyLines: true,
                trim: true
            })
        );

    const tasks: TaskData[] = [];

    for await (const rawRecord of parser) {
        const task: TaskData = {
            id: crypto.randomUUID(),
            title: rawRecord.title,
            description: rawRecord.description,
            completedAt: null,
            updatedAt: new Date()
        };
        tasks.push(task);
    }

    return tasks;
}