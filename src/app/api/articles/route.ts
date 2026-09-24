import { NextResponse } from "next/server";
import { getArticles } from "@/lib/data/articles";

export async function GET() {
  const data = await getArticles();
  return NextResponse.json({ data });
}
