import { NextRequest, NextResponse } from "next/server";

const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL;

type Params = { category: string; product: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { category, product } = await params;
  const search = req.nextUrl.searchParams.toString();
  const url = `${BFF_URL}/catalog/${category}/${product}${search ? `?${search}` : ""}`;

  const bffRes = await fetch(url);
  const data = await bffRes.json();
  return NextResponse.json(data, { status: bffRes.status });
}
