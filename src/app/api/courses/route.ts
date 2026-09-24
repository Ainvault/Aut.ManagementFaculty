import { NextResponse } from "next/server";
import { getCourses } from "@/lib/data/courses";

export async function GET() {
  const data = await getCourses();
  return NextResponse.json({ data });
}
