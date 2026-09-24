import { NextResponse } from "next/server";
import { getPrograms } from "@/lib/data/programs";

export async function GET() {
  const data = await getPrograms();
  return NextResponse.json({ data });
}
