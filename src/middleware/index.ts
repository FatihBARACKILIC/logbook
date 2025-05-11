import { sequence } from "astro:middleware";
import { authMiddleware } from "./auth.middleware";
import { refreshSessionMiddleware } from "./refresh-session.middleware";

export const onRequest = sequence(refreshSessionMiddleware, authMiddleware);
