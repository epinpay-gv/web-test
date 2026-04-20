import { NextRequest, NextResponse } from "next/server";

const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL;

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.toString();
  const url = `${BFF_URL}/catalog/products${search ? `?${search}` : ""}`;

  const bffRes = await fetch(url);
  const data = await bffRes.json();
  return NextResponse.json(data, { status: bffRes.status });
}
