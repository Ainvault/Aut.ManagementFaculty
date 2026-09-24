import Link from "next/link";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Newspaper,
  Plus,
  Users,
  MessageSquareQuote,
} from "lucide-react";
import { query } from "@/lib/db";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LeadsList, type LeadForDashboard } from "@/components/organisms/admin/LeadsList";
import {
  AdminPage,
  AdminPageHeader,
} from "@/components/organisms/admin/AdminPage";

export const dynamic = "force-dynamic";

interface CountRow {
  entity: string;
  n: number;
}

const getCounts = async (): Promise<Record<string, number>> => {
  const res = await query<CountRow>(
    `SELECT 'courses' AS entity, count(*)::int AS n FROM courses
     UNION ALL SELECT 'programs', count(*) FROM programs
     UNION ALL SELECT 'events', count(*) FROM events
     UNION ALL SELECT 'articles', count(*) FROM articles
     UNION ALL SELECT 'faculty', count(*) FROM faculty_members
     UNION ALL SELECT 'alumni', count(*) FROM alumni_stories`,
  );
  return Object.fromEntries(res.rows.map((r) => [r.entity, r.n]));
};

const countCards = [
  { key: "courses", label: "دوره‌ها", href: "/admin/courses", icon: BookOpen },
  { key: "programs", label: "برنامه‌ها", href: "/admin/programs", icon: GraduationCap },
  { key: "events", label: "رویدادها", href: "/admin/events", icon: Calendar },
  { key: "articles", label: "مقالات", href: "/admin/articles", icon: Newspaper },
  { key: "faculty", label: "اساتید", href: "/admin/faculty", icon: Users },
  { key: "alumni", label: "دانش‌آموختگان", href: "/admin/alumni", icon: MessageSquareQuote },
] as const;

export default async function AdminDashboardPage() {
  const [counts, leadsRes] = await Promise.all([
    getCounts(),
    query<LeadForDashboard>(
      `SELECT id, full_name, email, course_slug, status, created_at
       FROM registration_leads ORDER BY created_at DESC LIMIT 5`,
    ),
  ]);

  return (
    <AdminPage className="space-y-8">
      <AdminPageHeader
        title="داشبورد"
        description="نمای کلی محتوای مدیریت‌شدنی و درخواست‌های تازه"
        actions={
          <Link href="/admin/courses/new" className={cn(buttonVariants())}>
            <Plus className="size-4" />
            دوره جدید
          </Link>
        }
      />

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">آمار محتوا</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {countCards.map(({ key, label, href, icon: Icon }) => (
            <Link key={key} href={href} className="group">
              <Card className="h-full shadow-none transition-colors group-hover:bg-muted/40">
                <CardHeader className="gap-3 pb-2">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <CardDescription>{label}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold tabular-nums tracking-tight">
                    {counts[key] ?? 0}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Card className="shadow-none">
        <CardHeader className="border-b [.border-b]:pb-4">
          <CardTitle>درخواست‌های اخیر ثبت‌نام</CardTitle>
          <CardDescription>۵ درخواست آخر از برگ ثبت‌نام</CardDescription>
          <CardAction>
            <Link
              href="/admin/registrations"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              مشاهده همه
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="pt-6">
          <LeadsList leads={leadsRes.rows} />
        </CardContent>
      </Card>
    </AdminPage>
  );
}
