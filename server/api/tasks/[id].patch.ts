import { Task, UpdateTaskInput } from '~~/shared/tasks';

export default defineEventHandler(async (event): Promise<Task> => {
    const id = getRouterParam(event, 'id');
    const body = await readBody<UpdateTaskInput>(event);

// export interface Task {
//   id: string;
//   title: string;
//   completed: boolean;
// }
    return {
        id: id || 'unknown',
        title: 'Existing Task Title',
        completed: body.completed ?? false 
    }
})