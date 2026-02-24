import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  await new Promise((res) => setTimeout(res, 400));

  return NextResponse.json({
    success: true,
    message: "Sepet güncellendi",
  });
}