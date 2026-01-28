// server/utils/session.ts
import type { H3Event } from "h3";
import { UserPublic } from "~~/shared/types/users";

export interface UserSession {
  user?: UserPublic;
  loggedInAt?: number;
}
const SESSION_COOKIE_NAME = "my-app-session";

export async function getUserSession(event: H3Event): Promise<UserSession> {
  // useSession is a built-in H3 utility that handles the encryption
  const session = await useSession<UserSession>(event, {
    password: process.env.NUXT_SESSION_PASSWORD || "",
    name: SESSION_COOKIE_NAME,
  });

  return session.data;
}

export async function setUserSession(event: H3Event, data: UserSession) {
  const session = await useSession<UserSession>(event, {
    password: process.env.NUXT_SESSION_PASSWORD || "",
    name: SESSION_COOKIE_NAME,
  });

  await session.update(data);
  return session.data;
}

export async function clearUserSession(event: H3Event) {
  const session = await useSession<UserSession>(event, {
    password: process.env.NUXT_SESSION_PASSWORD || "",
    name: SESSION_COOKIE_NAME,
  });

  await session.clear();
  return true;
}
