import type { AstroGlobal } from "astro";
import { UnauthorizedError } from "../errors/unauthorized.error";

/**
 * The function `getUserFromSession` retrieves the user object from the session and throws an error if
 * the session is expired or invalid.
 * @param {AstroGlobal} c - AstroGlobal
 * @returns the user object stored in the `c.locals.user` property of the `AstroGlobal` object.
 */
export function getUserFromSession(c: AstroGlobal) {
  if (!c.locals.user) {
    throw new UnauthorizedError(
      "Your session has expired or is invalid. Please sign in again to continue."
    );
  }
  return c.locals.user;
}
