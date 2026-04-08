import { NextRequest, NextResponse } from "next/server";
import { mockStreams, mockMetadata } from "@/mocks";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string; streamer: string }> }
) {
  const { platform, streamer } = await params;

  const foundStream = mockStreams.find(
    (s) => 
      s.platform_value.toLowerCase() === platform.toLowerCase() && 
      s.streamer.streamerId.toLowerCase() === streamer.toLowerCase()
  );

  if (!foundStream) {
    return NextResponse.json({ error: "Streamer not found" }, { status: 404 });
  }

  // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 200));

  return NextResponse.json({
    metadata: mockMetadata.find((m) => m.pageId === 5), 
    data: foundStream,
  });
}
