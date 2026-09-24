import { NextResponse } from "next/server";
import { getCourseById } from "@/lib/data/courses";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const course = await getCourseById(id);
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }
  return NextResponse.json({ data: course });
}
