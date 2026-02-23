import { NextResponse } from "next/server";

export async function POST() {
  await new Promise((res) => setTimeout(res, 300));

  return NextResponse.json({
    success: true,
    message: "Bildirim oluşturuldu",
  });
}