// shared/types.ts

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export type CreateTaskInput = Pick<Task, "title">;
export type UpdateTaskInput = Partial<Pick<Task, "title" | "completed">>;

export interface CreateTaskBody {
  title: string;
}

export interface TaskResponse {
  id: string;
  title: string;
  completed: boolean;
}
