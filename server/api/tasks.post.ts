import { CreateTaskBody, TaskResponse } from "~~/shared/tasks";

export default defineEventHandler(async (event): Promise<TaskResponse> => {
  // We use the generic <CreateTaskBody> to tell TS what the body looks like
  const body = await readBody<CreateTaskBody>(event);

  // If title is missing or empty, we can throw a typed error
  if (!body?.title) {
    throw createError({
      statusCode: 400,
      statusMessage: "Title is required",
    });
  }

  // In a real app, this is where your database logic goes.
  // For now, we'll return a "mock" created task.
  const newTask: TaskResponse = {
    id: Math.random().toString(36).substring(7),
    title: body.title,
    completed: false,
  };

  return newTask;
});
