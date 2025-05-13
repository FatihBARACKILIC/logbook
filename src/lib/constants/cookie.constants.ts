/**
 * A collection of constant keys used for managing cookies in the application.
 *
 * @property SESSION_KEY - The key used to store the session identifier in cookies.
 */
export const COOKIE_KEYS = {
  /**
   * The key used to store the session identifier in cookies.
   * @type {string}
   */
  SESSION_KEY: "sid"
} as const satisfies Record<string, string>;
