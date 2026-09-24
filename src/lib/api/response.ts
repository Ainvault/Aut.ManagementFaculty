// Phase D — shared helpers for admin Route Handlers (unified error shape).

import { NextResponse } from "next/server";

export function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}