import { notFound } from "next/navigation";
import { getAdminCourseById } from "@/lib/data/admin/courses";
import { CourseForm } from "@/components/organisms/admin/courses/CourseForm";
import {
  AdminPage,
  AdminPageHeader,
} from "@/components/organisms/admin/AdminPage";

export const dynamic = "force-dynamic";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getAdminCourseById(id);
  if (!course) notFound();

  return (
    <AdminPage>
      <AdminPageHeader
        title="ویرایش دوره"
        description={course.title}
        backHref="/admin/courses"
        backLabel="بازگشت به دوره‌ها"
      />
      <CourseForm initial={course} />
    </AdminPage>
  );
}
