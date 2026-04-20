import { NextRequest, NextResponse } from "next/server";
import { proxyHeaders } from "@/lib/api/proxyHeaders";

const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL;

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.toString();
  const url = `${BFF_URL}/checkout/payment-methods${search ? `?${search}` : ""}`;
  const bffRes = await fetch(url, { headers: proxyHeaders(req) });
  const data = await bffRes.json();
  return NextResponse.json(data, { status: bffRes.status });
}
