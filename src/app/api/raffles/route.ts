import { NextResponse } from "next/server";
import { mockMetadata, rafflesMockData } from "@/mocks";
import { PaginationData } from "@/types/types";
import { ParticipationConstraint } from "@/components/common/Cards/RaffleCard/types";

export async function GET(req: Request) {
  //BANNER DATAS
  const featuredBannerData = rafflesMockData
    .filter((i) => i.creatorId === "1")
    .map((i) => ({
      name: i.creator.name,
      image: i.creator.image,
      raffle: i,
    }));

  const STREAMER_IDS = ["101", "102", "103", "104", "105", "106"];
  const streamerBannerData = rafflesMockData
    .filter((i) => STREAMER_IDS.includes(i.creatorId))
    .map((i) => ({
      name: i.creator.name,
      image: i.creator.image,
      raffle: i,
    }));

  //SLIDER DATAS
  const premiumSliderData = rafflesMockData
    .filter((i) => i.constraint === ParticipationConstraint.PREMIUM)
    .map((i) => ({
      title: "Premium üyelere özel çekilişler",
      raffles: i,
      line: 1,
    }));

  const referenceSliderData = rafflesMockData
    .filter((i) => i.constraint === ParticipationConstraint.REFERENCE)
    .map((i) => ({
      title: "Referanslı kullanıcılara özel çekilişler",
      raffles: i,
      line: 2,
    }));

  const epinpaySliderData = rafflesMockData
    .filter((i) => i.creatorId === "1")
    .map((i) => ({
      title: "Epinpay çekilişleri",
      raffles: i,
      line: 3,
    }));

  const sliderData = [...premiumSliderData, ...referenceSliderData, ...epinpaySliderData];

  // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 300));

  return NextResponse.json({
    metadata: mockMetadata.find((m) => m.pageId === 3),
    data: {
      activeParticipantCount: 126,
      winners: [],
      faq: [],
      sliders: sliderData,
      banners: {
        featured: featuredBannerData,
        streamers: streamerBannerData,
      },
    },
  });
}
