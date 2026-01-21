import type { InferSelectModel } from "drizzle-orm";
import { users } from "~~/server/utils/db/schema";

export type User = InferSelectModel<typeof users>;
export type UserPublic = Omit<User, "password">;

export interface AuthState {
  user: UserPublic | null;
  isLoggedIn: boolean;
}
