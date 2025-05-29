import {IncomingMessage} from "http";
import {ServerResponse} from "node:http";
import Database from "@/Database";

const database = new Database();

export default class TasksController {

    async index(req: IncomingMessage, res: ServerResponse): Promise<void> {
        res.writeHead(200).end('Listagem de tarefas');
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

    async update(req: IncomingMessage, res: ServerResponse): Promise<void> {
        res.writeHead(200).end('Atualização de tarefas');
    }

    async delete(req: IncomingMessage, res: ServerResponse): Promise<void> {
        res.writeHead(200).end('Deleção de tarefas');
    }

    async complete(req: IncomingMessage, res: ServerResponse): Promise<void> {
        res.writeHead(200).end('Completar tarefa');
    }
}