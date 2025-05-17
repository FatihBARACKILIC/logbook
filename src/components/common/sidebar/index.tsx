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
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl"></div>
            <div className="bg-muted/50 aspect-video rounded-xl"></div>
            <div className="bg-muted/50 aspect-video rounded-xl"></div>
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <slot />
          </div> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
