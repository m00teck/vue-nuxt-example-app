// server/api/tasks.get.ts
import { db } from "~~/server/utils/db";
import { tasks } from "~~/server/utils/db/schema";
import { desc } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const allTasks = await db
      .select()
      .from(tasks)
      .orderBy(desc(tasks.createdAt));

    return allTasks;
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch tasks from database",
    });
  }
});
