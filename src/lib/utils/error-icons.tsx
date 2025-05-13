import { LogInIcon, type LucideIcon } from "lucide-react";

export type ErrorIcons = keyof typeof ERROR_ICONS;

export const ERROR_ICONS = {
  SIGN_IN: LogInIcon
} as const satisfies Record<string, LucideIcon>;
