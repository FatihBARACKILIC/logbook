/**
 * A collection of constants representing expiration times for various tokens in seconds.
 *
 * @constant
 * @namespace EXPIRATION_TIMES
 *
 * @property {number} EMAIL_VERIFICATION_TOKEN - The expiration time for email verification tokens in seconds. (15 minutes).
 * @default 900
 * @description 15 minutes
 */
export const EXPIRATION_TIMES = {
  /**
   * The expiration time for email verification tokens in seconds. (15 minutes).
   * @type {number}
   * @constant
   * @default 900
   * @description 15 minutes
   */
  EMAIL_VERIFICATION_TOKEN: 15 * 60
} as const satisfies Record<string, number>;
