// server/utils/auth.ts
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";

export const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
};

export const verifyPassword = (password: string, hash: string): boolean => {
  const [salt, key] = hash.split(":");
  const derivedKey = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");
  // timingSafeEqual helps prevent timing attacks
  return timingSafeEqual(derivedKey, keyBuffer);
};
