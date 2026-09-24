import { CourseForm } from "@/components/organisms/admin/courses/CourseForm";
import {
  AdminPage,
  AdminPageHeader,
} from "@/components/organisms/admin/AdminPage";

export const dynamic = "force-dynamic";

export default function NewCoursePage() {
  return (
    <AdminPage>
      <AdminPageHeader
        title="دوره جدید"
        description="دوره پس از ثبت، در صورت «منتشرشده» بودن در سایت عمومی نمایش داده می‌شود."
        backHref="/admin/courses"
        backLabel="بازگشت به دوره‌ها"
      />
      <CourseForm />
    </AdminPage>
  );
}
