import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "This endpoint is deprecated. Use product.formType from BFF." }, { status: 410 });
}
