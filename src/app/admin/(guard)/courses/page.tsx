import Link from "next/link";
import { listAdminCourses } from "@/lib/data/admin/courses";
import { CourseTable } from "@/components/organisms/admin/courses/CourseTable";
import { CourseFilters } from "@/components/organisms/admin/courses/CourseFilters";
import {
  AdminPage,
  AdminPageHeader,
  AdminTableCard,
  AdminToolbarCard,
} from "@/components/organisms/admin/AdminPage";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; published?: string }>;
}) {
  const { search = "", published: publishedRaw } = await searchParams;
  const published =
    publishedRaw === "true" ? true : publishedRaw === "false" ? false : undefined;

  const courses = await listAdminCourses({ search, published });

  return (
    <AdminPage>
      <AdminPageHeader
        title="دوره‌ها"
        description={`${courses.length} دوره${search ? ` مطابق فیلتر «${search}»` : ""}`}
        actions={
          <Link href="/admin/courses/new" className={cn(buttonVariants())}>
            + دوره جدید
          </Link>
        }
      />

      <AdminToolbarCard description="جستجو بر اساس عنوان یا اسلاگ و فیلتر وضعیت انتشار">
        <CourseFilters
          initialSearch={search}
          initialPublished={publishedRaw ?? "all"}
        />
      </AdminToolbarCard>

      <AdminTableCard
        title="فهرست دوره‌ها"
        description="مدیریت، انتشار و پیش‌نمایش دوره‌های کوتاه"
      >
        <CourseTable courses={courses} />
      </AdminTableCard>
    </AdminPage>
  );
}
