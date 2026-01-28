import { db } from "~~/server/utils/db";
import { users } from "~~/server/utils/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  await clearUserSession(event);
  const body = await readBody(event);
  const { email, username, password } = body; // Destructure other fields as needed

  // Basic validation
  if (!email || !username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email, username, and password are required",
    });
  }
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    throw createError({
      statusCode: 409,
      statusMessage: "Email is already registered",
    });
  }
  const hashedPassword = await hashPassword(password);

  const [newUser] = await db
    .insert(users)
    .values({
      email,
      username,
      password: hashedPassword,
      createdAt: new Date(),
    })
    .returning();
  await setUserSession(event, {
    user: {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      createdAt: newUser.createdAt,
    },
  });
  return { id: newUser.id, email: newUser.email, username: newUser.username };
});
