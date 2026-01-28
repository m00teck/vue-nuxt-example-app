import { eq } from "drizzle-orm";
import { TaskErrorRequest } from "~~/shared/types/tasks";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError<TaskErrorRequest>({
      statusCode: 400,
      statusMessage: "Task ID is required",
    });
  }

  try {
    const [deletedTask] = await db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();

    if (!deletedTask) {
      throw createError<TaskErrorRequest>({
        statusCode: 404,
        statusMessage: "Task not found",
      });
    }

    return deletedTask;
  } catch (e) {
    throw createError<TaskErrorRequest>({
      statusCode: 500,
      statusMessage: "An error occurred while updating the task",
    });
  }
});
