import { NextResponse } from "next/server";
import { mockMetadata, mockStreams, mockPlatforms, mockEpinpayStreamers, mockPackages } from "@/mocks";

export async function GET() {
  // MAIN BANNER
  const mainBannerData = mockStreams.slice(0, 3);

  // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 300));

  return NextResponse.json({
    metadata: mockMetadata.find((m) => m.pageId === 5),
    data: {
      mainBanner: mainBannerData,
      streams: { platforms: mockPlatforms, streams: mockStreams },
      epinpayStreamer: mockEpinpayStreamers,
      packages: mockPackages,
      faq: [],
    },
  });
}
