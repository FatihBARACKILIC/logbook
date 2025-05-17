import { HelpCircleIcon, type LucideIcon } from "lucide-react";

type Helper = {
  title: string;
  icon: LucideIcon;
  url: `/app/${string}`;
};

export const helpers: Readonly<Array<Helper>> = [
  {
    title: "Help",
    url: "/app/help",
    icon: HelpCircleIcon
  }
] as const;
