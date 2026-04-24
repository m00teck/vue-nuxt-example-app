import { Task, UpdateTaskInput, TaskErrorRequest } from "~~/shared/types/tasks";
import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event): Promise<Task> => {
  const session = await getUserSession(event);
  if (!session?.user) {
    throw createError<TaskErrorRequest>({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError<TaskErrorRequest>({ statusCode: 400, statusMessage: "Task ID is required" });
  }

  const body = await readBody<UpdateTaskInput>(event);

  const [updatedTask] = await db
    .update(tasks)
    .set(body)
    .where(and(eq(tasks.id, id), eq(tasks.userId, session.user.id)))
    .returning();

  if (!updatedTask) {
    throw createError<TaskErrorRequest>({ statusCode: 404, statusMessage: "Task not found" });
  }

  return updatedTask;
});
