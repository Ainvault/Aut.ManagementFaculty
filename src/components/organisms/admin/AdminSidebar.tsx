"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  MessageSquareQuote,
  Newspaper,
  Scale,
  Tags,
  Users,
  ClipboardList,
  BarChart3,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/organisms/admin/LogoutButton";

const NAV_GROUPS = [
  {
    label: "نمای کلی",
    items: [{ href: "/admin", label: "داشبورد", icon: LayoutDashboard, exact: true }],
  },
  {
    label: "محتوا",
    items: [
      { href: "/admin/courses", label: "دوره‌ها", icon: BookOpen },
      { href: "/admin/programs", label: "برنامه‌ها", icon: GraduationCap },
      { href: "/admin/events", label: "رویدادها", icon: Calendar },
      { href: "/admin/articles", label: "مقالات", icon: Newspaper },
      { href: "/admin/topics", label: "موضوعات", icon: Tags },
    ],
  },
  {
    label: "جامعه",
    items: [
      { href: "/admin/faculty", label: "اساتید", icon: Users },
      { href: "/admin/alumni", label: "دانش‌آموختگان", icon: MessageSquareQuote },
    ],
  },
  {
    label: "سایت",
    items: [
      { href: "/admin/banners", label: "بنرهای کمپین", icon: Megaphone },
      { href: "/admin/stats", label: "آمار", icon: BarChart3 },
      { href: "/admin/testimonials", label: "نظرات", icon: FileText },
      { href: "/admin/legal", label: "صفحات قانونی", icon: Scale },
    ],
  },
  {
    label: "درخواست‌ها",
    items: [{ href: "/admin/registrations", label: "برگ ثبت‌نام", icon: ClipboardList }],
  },
] as const;

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const initials = userName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <Sidebar side="right" collapsible="icon" variant="inset">
      <SidebarHeader className="h-(--header-height) shrink-0 justify-center gap-0 border-b border-sidebar-border p-0 px-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/admin" />}
              className="data-active:bg-sidebar-accent"
            >
              <span className="relative size-8 shrink-0">
                <Image
                  src="/brand/amirkabir.png"
                  alt=""
                  fill
                  sizes="32px"
                  className="object-contain brightness-0"
                  priority
                />
              </span>
              <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate font-semibold">پنل مدیریت</span>
                <span className="truncate text-xs text-muted-foreground">
                  آموزش آزاد امیرکبیر
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(
                    pathname,
                    item.href,
                    "exact" in item ? item.exact : false,
                  );
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={active}
                        tooltip={item.label}
                        render={<Link href={item.href} />}
                      >
                        <Icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="flex items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar px-2 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:p-0">
          <Avatar className="size-8">
            <AvatarFallback className="bg-sidebar-accent text-xs font-semibold">
              {initials || "اد"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-medium">{userName}</p>
            <p className="truncate text-xs text-muted-foreground">مدیر محتوا</p>
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <LogoutButton />
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
