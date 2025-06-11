import {IncomingMessage} from "http";
import {ServerResponse} from "node:http";
import Database from "@/Database";
import importCsv from "@/utils/importCsv";

const database = new Database();

export default class TasksController {

    async index(req: IncomingMessage, res: ServerResponse): Promise<ServerResponse> {
        const {search} = req.query;
        const tasks: TaskData[] = database.read('tasks', search ? {
            title: search,
            description: search
        } : undefined);

        return res.setHeader('Content-Type', 'application/json')
            .writeHead(200)
            .end(JSON.stringify(tasks));
    }

    async create(req: IncomingMessage, res: ServerResponse): Promise<ServerResponse> {

        if (!req.body) {
            return res.writeHead(422).end();
        }

        const {title, description} = req.body;

        if (!title || !description) {
            return res.writeHead(422).end('Título e descrição obrigatórios.');
        }

        const task: TaskData = {
            id: crypto.randomUUID(),
            title,
            description,
            completedAt: null,
            updatedAt: new Date(),
        }

        await database.create('tasks', task);

        return res.writeHead(201).end();
    }

    async update(req: IncomingMessage, res: ServerResponse): Promise<ServerResponse> {
        if (!req.params.id || !req.body) {
            return res.writeHead(422).end();
        }

        const {id} = req.params;
        const {title, description} = req.body;

        await database.update('tasks', id, {
            title,
            description,
            updatedAt: new Date()
        });

        return res.writeHead(204).end();
    }

    async delete(req: IncomingMessage, res: ServerResponse): Promise<ServerResponse> {
        if (!req.params.id) {
            return res.writeHead(422).end();
        }
        const {id} = req.params;
        await database.delete('tasks', id);

        return res.writeHead(204).end();
    }

    async complete(req: IncomingMessage, res: ServerResponse): Promise<ServerResponse> {
        if (!req.params.id) {
            return res.writeHead(422).end();
        }
        const {id} = req.params;

        await database.update('tasks', id, {
            completedAt: new Date()
        });

        return res.writeHead(200).end('Completar tarefa');
    }

    async import(req: IncomingMessage, res: ServerResponse): Promise<ServerResponse> {
        const csvPath = new URL('../../tasks.csv', import.meta.url);
        try {
            const tasks: TaskData[] = await importCsv(csvPath);
            for (const task of tasks) {
                await database.create('tasks', task);
            }
        } catch (e) {
            return res.writeHead(500).end('Erro ao importar tarefas');
        }
        return res.writeHead(200).end('Tarefas importadas com sucesso!');
    }
}