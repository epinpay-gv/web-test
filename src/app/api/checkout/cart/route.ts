import { NextRequest, NextResponse } from "next/server";
import { proxyHeaders } from "@/lib/api/proxyHeaders";

const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL;

export async function GET(req: NextRequest) {
  const bffRes = await fetch(`${BFF_URL}/checkout/cart`, {
    headers: proxyHeaders(req),
    cache: "no-store",
  });
  const data = await bffRes.json();
  return NextResponse.json(data, { status: bffRes.status });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const bffRes = await fetch(`${BFF_URL}/checkout/cart`, {
    method: "POST",
    headers: proxyHeaders(req, true),
    body: JSON.stringify(body),
  });
  const data = await bffRes.json();
  return NextResponse.json(data, { status: bffRes.status });
}
