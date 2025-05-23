import { BaserError } from "./base.error";

export class ListNotFoundError extends BaserError {
  constructor(
    public readonly message: string = "List not found",
    public readonly cause?: unknown
  ) {
    super({
      status: "NOT_FOUND",
      message,
      cause,
      links: [
        {
          url: "/app/lists",
          icon: "LISTS",
          srOnly: "Go to Lists Page"
        }
      ]
    });
  }
}
