import {IncomingMessage} from "http";
import {ServerResponse} from "node:http";

export default class TasksController {
    async index(req: IncomingMessage, res: ServerResponse): Promise<void> {
        res.writeHead(200).end('Listagem de tarefas');
    }

    async create(req: IncomingMessage, res: ServerResponse): Promise<void> {
        res.writeHead(200).end('Criação de tarefas');
    }

    async update(req: IncomingMessage, res: ServerResponse): Promise<void> {
        res.writeHead(200).end('Atualização de tarefas');
    }

    async delete(req: IncomingMessage, res: ServerResponse): Promise<void> {
        res.writeHead(200).end('Deleção de tarefas');
    }
}