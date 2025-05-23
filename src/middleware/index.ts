import { sequence } from "astro:middleware";
import { authMiddleware } from "./auth.middleware";
import { getUserSessionDataMiddleware } from "./get-session-data.middleware";
import { refreshSessionMiddleware } from "./refresh-session.middleware";
import { actionMiddleware } from "./action.middleware";

export const onRequest = sequence(
  refreshSessionMiddleware,
  authMiddleware,
  getUserSessionDataMiddleware,
  actionMiddleware
);
