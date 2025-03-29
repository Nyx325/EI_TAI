import { hash, compare } from "bcrypt";
import { SALT_ROUNDS } from "../config.js";
export async function hashPassword(password) {
    const hashedPassword = await hash(password, SALT_ROUNDS);
    return hashedPassword;
}
export async function verifyPassword(inputPassword, storedHash) {
    const match = await compare(inputPassword, storedHash);
    return match; // true si coincide, false si no
}
