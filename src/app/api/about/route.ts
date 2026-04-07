import { NextResponse } from "next/server";
import {
  mockMetadata,
  aboutMockData,
} from "@/mocks";
import { ParticipationConstraint } from "@/types/types";

export async function GET() {


  // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 300));

  return NextResponse.json({
    metadata: mockMetadata.find((m) => m.pageId === 3),
    data: aboutMockData,
  });
}
