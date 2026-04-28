import { NextRequest, NextResponse } from "next/server";
import { proxyHeaders } from "@/lib/api/proxyHeaders";

const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL;

type Params = { id: string };

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const body = await req.json();
  const bffRes = await fetch(`${BFF_URL}/checkout/order/${id}`, {
    method: "POST",
    headers: proxyHeaders(req, true),
    body: JSON.stringify(body),
  });
  const data = await bffRes.json();
  return NextResponse.json(data, { status: bffRes.status });
}
