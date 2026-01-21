import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { tasks } from "~~/server/utils/db/schema";

export type Task = InferSelectModel<typeof tasks>;
export type NewTask = InferInsertModel<typeof tasks>;

// UI specific helper
export type UpdateTaskInput = Partial<Pick<Task, "title" | "completed">>;
