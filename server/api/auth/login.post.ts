import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, body.email))
    .limit(1);

  if (!user || !verifyPassword(body.password, user.password)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password",
    });
  }
  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    },
  });

  return { success: true };
});
