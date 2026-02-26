import { NextResponse } from "next/server";
import { mockMainPage, mockMetadata } from "@/mocks";

export async function GET() {
  // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 200));

  return NextResponse.json({data: mockMainPage, metadata: mockMetadata.find(m => m.pageId === 1)});
}
