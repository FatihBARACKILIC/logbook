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
import type { ComponentProps } from "react";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarHeaderButton title={APP_CONSTANTS.APP_NAME} href="/app" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavHelpers />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
