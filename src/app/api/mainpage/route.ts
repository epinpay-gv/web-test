import { NextResponse } from "next/server";
import { mockMainPage } from "@/mocks";

export async function GET() {
  // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 200));

  return NextResponse.json(mockMainPage);
}
