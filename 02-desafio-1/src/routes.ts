import TasksController from "@/controllers/TasksController";
import buildRoutePath from "@/utils/buildRoutePath";

const tasksController = new TasksController();

const routes: Route[] = [
    {
        path: buildRoutePath('/tasks'),
        method: 'GET',
        handler: tasksController.index
    },
    {
        path: buildRoutePath('/tasks'),
        method: 'POST',
        handler: tasksController.create
    },
    {
        path: buildRoutePath('/tasks/:id'),
        method: 'PUT',
        handler: tasksController.update
    },
    {
        path: buildRoutePath('/tasks/:id'),
        method: 'DELETE',
        handler: tasksController.delete
    },
];

export default routes;