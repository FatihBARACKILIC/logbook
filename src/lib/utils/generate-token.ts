import { randomBytes } from "node:crypto";

/**
 * The function generates a random token of a specified length using hexadecimal characters.
 * @param {number} [length=8] - The `length` parameter in the `generateToken` function specifies the
 * length of the token to be generated. By default, if no length is provided, the token will be 8
 * characters long.
 * @returns A randomly generated token of the specified length is being returned. The token is
 * generated using random bytes and then converted to a hexadecimal string before being sliced to the
 * specified length.
 */
export function generateToken(length: number = 8) {
  return randomBytes(length).toString("hex").slice(0, length);
}
