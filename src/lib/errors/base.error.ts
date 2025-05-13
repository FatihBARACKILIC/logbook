import { STATUS_CODES } from "@/lib/constants/status.codes";
import type { ErrorIcons } from "@/lib/utils/error-icons";
import { toCamelCase } from "@/lib/utils/string.utils";

type Action = {
  icon?: ErrorIcons;
  title?: string;
  srOnly?: string;
};

export type LinkAction = Action & { url: string };

type Props = {
  status: keyof typeof STATUS_CODES;
  name?: string;
  message: string;
  cause?: unknown;
  links?: LinkAction[];
};

type HandleErrorReturn = {
  title: string;
  message: string;
  links: LinkAction[];
};

export abstract class BaserError extends Error {
  private readonly _status: keyof typeof STATUS_CODES;
  private readonly _links: LinkAction[];

  constructor({ status, name, message, cause, links }: Props) {
    super(message, { cause });
    this._status = status;
    this.name = name ?? toCamelCase(status);
    this.message = message;
    this.cause = cause;
    this._links = links ?? [];
  }

  public get status(): string {
    return this._status;
  }

  public get statusCode(): number {
    return STATUS_CODES[this._status];
  }

  public get links(): LinkAction[] {
    return this._links;
  }

  public static handleError(error: unknown): HandleErrorReturn {
    if (error instanceof BaserError) {
      return {
        title: error.name,
        message: error.message,
        links: error.links
      };
    } else if (error instanceof Error) {
      return {
        title: error.name,
        message: error.message,
        links: []
      };
    }
    return {
      title: "Something went wrong",
      message:
        "An unexpected error has occurred. Please try again later or contact support if the problem persists.",
      links: []
    };
  }
}
