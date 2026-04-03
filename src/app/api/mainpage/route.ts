import { NextResponse } from "next/server";
import { mockEpinpayStreamers, mockMainPage, mockMetadata, rafflesMockData } from "@/mocks";

export async function GET() {
  const STREAMER_IDS = ["101", "102", "103", "104", "105", "106"];
  const streamerBannerData = rafflesMockData
    .filter((i) => STREAMER_IDS.includes(i.creatorId))
    .map((i) => ({
      id: i.creatorId,
      name: i.creator.name,
      image: i.creator.image,
      raffle: i,
    }));

  const epinpaySliderData = rafflesMockData.filter((i) => i.creatorId === "1");

  // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 200));

  return NextResponse.json({
    data: {
      ...mockMainPage,
      streamerRaffles: streamerBannerData,
      epinpayRaffles: {
        title: "Epinpay çekilişleri",
        raffles: epinpaySliderData,
        line: 3,
      },
      epinpayStreamers: mockEpinpayStreamers,
    },
    metadata: mockMetadata.find((m) => m.pageId === 1),
  });
}
