import { SidebarHeaderButton } from "@/components/common/sidebar//sidebar-header-button";
import { NavHelpers } from "@/components/common/sidebar/nav-helpers";
import { NavMain } from "@/components/common/sidebar/nav-lists";
import { NavUser } from "@/components/common/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";
import { APP_CONSTANTS } from "@/lib/constants/app.constants";
import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";
import type { ComponentProps } from "react";

const navMain = [
  {
    title: "Playground",
    url: "#",
    icon: SquareTerminal,
    // isActive: true,
    items: [
      {
        title: "History",
        url: "#"
      },
      {
        title: "Starred",
        url: "#"
      },
      {
        title: "Settings",
        url: "#"
      }
    ]
  },
  {
    title: "Models",
    url: "#",
    icon: Bot,
    items: [
      {
        title: "Genesis",
        url: "#"
      },
      {
        title: "Explorer",
        url: "#"
      },
      {
        title: "Quantum",
        url: "#"
      }
    ]
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
    items: [
      {
        title: "Introduction",
        url: "#"
      },
      {
        title: "Get Started",
        url: "#"
      },
      {
        title: "Tutorials",
        url: "#"
      },
      {
        title: "Changelog",
        url: "#"
      }
    ]
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "#"
      },
      {
        title: "Team",
        url: "#"
      },
      {
        title: "Billing",
        url: "#"
      },
      {
        title: "Limits",
        url: "#"
      }
    ]
  }
];
export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarHeaderButton title={APP_CONSTANTS.APP_NAME} href="/app" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavHelpers />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
