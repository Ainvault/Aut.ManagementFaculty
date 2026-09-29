import { NextResponse } from "next/server";
import { getCourses } from "@/lib/data/courses";
import { errorResponse } from "@/lib/api/response";

export async function GET() {
  try {
    const data = await getCourses();
    return NextResponse.json({ data });
  } catch (err) {
    console.error("[api/courses]", err);
    return errorResponse("Database unavailable", 503);
  }
}
