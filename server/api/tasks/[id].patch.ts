import { Task, UpdateTaskInput, TaskErrorRequest } from "~~/shared/types/tasks";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event): Promise<Task> => {
  const id = getRouterParam(event, "id");
  const body = await readBody<UpdateTaskInput>(event);

  if (!id) {
    throw createError<TaskErrorRequest>({
      statusCode: 400,
      statusMessage: "Task ID is required",
    });
  }

  try {
    const [updatedTask] = await db
      .update(tasks)
      .set(body)
      .where(eq(tasks.id, id))
      .returning();

    if (!updatedTask) {
      throw createError<TaskErrorRequest>({
        statusCode: 404,
        statusMessage: "Task not found",
      });
    }

    return updatedTask;
  } catch (e) {
    throw createError<TaskErrorRequest>({
      statusCode: 500,
      statusMessage: "An error occurred while updating the task",
    });
  }
});
