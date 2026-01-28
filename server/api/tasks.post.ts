// server/api/tasks.post.ts
export default defineEventHandler(async (event) => {
  // 1. Get the session
  const session = await getUserSession(event);

  console.log("Session in tasks.post.ts: ", session);

  // 2. Check auth BEFORE trying to do anything else
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "You must be logged in to create tasks.",
    });
  }

  // 3. NOW read the body
  const body = await readBody(event);

  if (!body.title) {
    throw createError({ statusCode: 400, statusMessage: "Title is required" });
  }

  // 4. Insert into DB
  const [newTask] = await db
    .insert(tasks)
    .values({
      title: body.title,
      userId: session.user.id,
      completed: false,
    })
    .returning();

  return newTask;
});
