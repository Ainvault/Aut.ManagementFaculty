"use client";

import Image from "next/image";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminSidebar } from "@/components/organisms/admin/AdminSidebar";

export function AdminShell({
  userName,
  children,
}: {
  userName: string;
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider
        dir="rtl"
        style={
          {
            "--sidebar-width": "16.5rem",
            "--header-height": "3.5rem",
          } as React.CSSProperties
        }
      >
        <AdminSidebar userName={userName} />
        <SidebarInset className="bg-muted/30 md:peer-data-[variant=inset]:ms-2 md:peer-data-[variant=inset]:me-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:me-2">
          <header className="sticky top-0 z-20 flex h-(--header-height) shrink-0 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80">
            <SidebarTrigger className="-ms-1" />
            <Separator orientation="vertical" className="me-1 data-[orientation=vertical]:h-4" />
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="relative size-6 shrink-0 overflow-hidden rounded-full bg-chart-3 ring-1 ring-border md:hidden">
                  <Image
                    src="/brand/amirkabir.png"
                    alt=""
                    fill
                    sizes="24px"
                    className="object-contain p-[15%]"
                  />
                </span>
                <p className="truncate text-sm font-medium text-muted-foreground">
                  مدیریت محتوا
                </p>
              </div>
              <span className="hidden truncate text-sm text-muted-foreground sm:inline">
                {userName}
              </span>
            </div>
          </header>
          <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-8 md:py-8">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
