import { BaserError } from "./base.error";

export class UnauthorizedError extends BaserError {
  constructor(
    public readonly message: string = "Authentication is required or has failed. Please provide valid credentials.",
    public readonly cause?: unknown
  ) {
    super({
      status: "UNAUTHORIZED",
      message,
      cause,
      links: [
        {
          url: "/auth/sign-in",
          icon: "SIGN_IN",
          srOnly: "Go to Sign In Page"
        }
      ]
    });
  }
}
