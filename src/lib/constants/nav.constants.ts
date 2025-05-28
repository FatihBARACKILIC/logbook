import { HelpCircleIcon, ListIcon, type LucideIcon } from "lucide-react";

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

type NavMain = {
  title: string;
  url: `/app/${string}`;
  isActive?: boolean;
  icon: LucideIcon;
  items?: Array<{ title: string; url: string }>;
};

export const NAV_MAIN: Readonly<Array<NavMain>> = [
  {
    title: "Lists",
    url: "/app/lists",
    icon: ListIcon
  }
] as const;
