// shared/types.ts

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// We can also define what's needed to create or update a task
export type CreateTaskInput = Pick<Task, 'title'>;
export type UpdateTaskInput = Partial<Pick<Task, 'title' | 'completed'>>;


// Define what the frontend MUST send us
export interface CreateTaskBody {
  title: string;
}

// Define what the server WILL return
export interface TaskResponse {
  id: string;
  title: string;
  completed: boolean;
}