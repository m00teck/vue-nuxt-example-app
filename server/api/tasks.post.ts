import { db } from "~~/server/utils/db";
import { tasks } from "~~/server/utils/db/schema";
import { NewTask } from "~~/shared/types/tasks";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ title: string }>(event);

  if (!body.title) {
    throw createError({ statusCode: 400, statusMessage: "Title is required" });
  }

  // Define the data for insertion
  const insertData: NewTask = {
    title: body.title,
    completed: false,
    // Note: userId would go here if we were tracking ownership!
  };

  const [newTask] = await db.insert(tasks).values(insertData).returning(); // This returns the full object including the generated UUID

  return newTask;
});
