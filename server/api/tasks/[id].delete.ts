import { and, eq } from "drizzle-orm";
import { TaskErrorRequest } from "~~/shared/types/tasks";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session?.user) {
    throw createError<TaskErrorRequest>({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError<TaskErrorRequest>({ statusCode: 400, statusMessage: "Task ID is required" });
  }

  const [deletedTask] = await db
    .delete(tasks)
    .where(and(eq(tasks.id, id), eq(tasks.userId, session.user.id)))
    .returning();

  if (!deletedTask) {
    throw createError<TaskErrorRequest>({ statusCode: 404, statusMessage: "Task not found" });
  }

  return deletedTask;
});
