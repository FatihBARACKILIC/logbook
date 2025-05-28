import { AppSidebar } from "@/components/common/sidebar/app-sidebar";
import { SidebarBreadcrumb } from "@/components/common/sidebar/sidebar-breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  sidebarState: boolean;
};

export function Sidebar({ children, sidebarState }: Props) {
  return (
    <SidebarProvider defaultOpen={sidebarState}>
      <AppSidebar />
      <SidebarInset>
        <SidebarBreadcrumb />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
