import { NextRequest, NextResponse } from "next/server";
import { mockStreams, mockMetadata } from "@/mocks";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string; streamer: string }> }
) {
  const { platform, streamer } = await params;

  // Mock datadan yayıncıyı bul (platform ve nick_name eşleşmesi)
  const foundStream = mockStreams.find(
    (s) => 
      s.platform_value.toLowerCase() === platform.toLowerCase() && 
      s.streamer.nick_name.toLowerCase() === streamer.toLowerCase()
  );

  // Eğer bulunamazsa fallback olarak ilkini veya 404 dön
  if (!foundStream) {
    return NextResponse.json({ error: "Streamer not found" }, { status: 404 });
  }

  // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 200));

  return NextResponse.json({
    metadata: mockMetadata.find((m) => m.pageId === 5), // Streamers ana sayfası metadata'sını şimdilik reuse ediyoruz
    data: foundStream,
  });
}
