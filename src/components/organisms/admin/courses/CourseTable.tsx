import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { AdminCourse } from "@/lib/data/admin/courses";
import { categoryLabel, formatCoursePrice, formatLabel } from "@/lib/labels";
import { PublishToggle } from "@/components/organisms/admin/courses/PublishToggle";
import { DeleteCourseDialog } from "@/components/organisms/admin/courses/DeleteCourseDialog";

export function CourseTable({ courses }: { courses: AdminCourse[] }) {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
        <p className="text-sm font-medium text-foreground">دوره‌ای یافت نشد</p>
        <p className="mt-1 text-sm text-muted-foreground">
          فیلتر را تغییر دهید یا دوره جدیدی بسازید.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>عنوان</TableHead>
            <TableHead>دسته</TableHead>
            <TableHead>قالب</TableHead>
            <TableHead>مدت (ساعت)</TableHead>
            <TableHead>قیمت</TableHead>
            <TableHead>انتشار</TableHead>
            <TableHead>عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell>
                <Badge variant="secondary">{categoryLabel(course.category)}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatLabel(course.format)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {course.durationHours ?? "—"}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatCoursePrice(course.price) ?? "—"}
              </TableCell>
              <TableCell>
                <PublishToggle id={course.id} published={course.published} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/courses/${course.id}/edit`}
                    className="text-sm text-primary hover:underline"
                  >
                    ویرایش
                  </Link>
                  {course.published && (
                    <Link
                      href={`/register/${course.slug}`}
                      className="text-sm text-muted-foreground hover:underline"
                    >
                      پیش‌نمایش
                    </Link>
                  )}
                  <DeleteCourseDialog id={course.id} title={course.title} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}