import { NextResponse } from "next/server";
import { getProgramBySlug } from "@/lib/data/programs";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) {
    return NextResponse.json({ error: "Program not found" }, { status: 404 });
  }
  return NextResponse.json({ data: program });
}
