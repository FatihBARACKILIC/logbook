import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "@/hooks/use-pathname";
import { Fragment } from "react/jsx-runtime";
export function SidebarBreadcrumb() {
  const pathname = usePathname();
  const filteredSplit = pathname.split("/").slice(1);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          {filteredSplit.length === 1 ? (
            <AppBreadcrumb />
          ) : (
            <SlugBreadcrumb pages={filteredSplit} />
          )}
        </Breadcrumb>
      </div>
    </header>
  );
}

function AppBreadcrumb() {
  return (
    <BreadcrumbItem>
      <BreadcrumbPage> App </BreadcrumbPage>
    </BreadcrumbItem>
  );
}

type SlugBreadcrumbProps = {
  pages: Array<string>;
};

function SlugBreadcrumb({ pages }: SlugBreadcrumbProps) {
  if (pages[0] === "app") {
    pages = pages.slice(1);
  }

  return (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/app"> App </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      {pages.map((page, index, pages) => (
        <Fragment key={index}>
          {index === pages.length - 1 ? (
            <BreadcrumbItem>
              <BreadcrumbPage>{page.replaceAll("-", " ")}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={`/app/${pages.slice(0, index + 1).join("/")}`}>
                  {page.replaceAll("-", " ")}{" "}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </>
          )}
        </Fragment>
      ))}
    </BreadcrumbList>
  );
}
