import { hash, compare } from "bcrypt";
import { SALT_ROUNDS } from "../config.js";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, SALT_ROUNDS);
  return hashedPassword;
}

export async function verifyPassword(
  inputPassword: string,
  storedHash: string,
) {
  const match = await compare(inputPassword, storedHash);
  return match; // true si coincide, false si no
}
