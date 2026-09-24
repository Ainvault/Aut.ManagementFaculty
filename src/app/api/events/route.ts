import { NextResponse } from "next/server";
import { getEvents } from "@/lib/data/events";

export async function GET() {
  const data = await getEvents();
  return NextResponse.json({ data });
}
