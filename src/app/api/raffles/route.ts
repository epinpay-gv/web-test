import { NextResponse } from "next/server";
import {
  mockMetadata,
  rafflesMockData,
  rafflesFaqMockData,
  rafflesWinnersMockData,
} from "@/mocks";
import { ParticipationConstraint } from "@/components/common/Cards/RaffleCard/types";

export async function GET() {
  //BANNER DATAS
  const epinpayRaffles = rafflesMockData
    .filter((i) => i.creatorId === "1");

  const featuredBannerData = {
      id: "1",
      name: "Epinpay Raffles",
      image: "",
      raffle: epinpayRaffles,
  }

  const STREAMER_IDS = ["101", "102", "103", "104", "105", "106"];
  const streamerBannerData = rafflesMockData
    .filter((i) => STREAMER_IDS.includes(i.creatorId))
    .map((i) => ({
      id: i.creatorId,
      name: i.creator.name,
      image: i.creator.image,
      raffle: i,
    }));

  //SLIDER DATAS
  const premiumSliderData = rafflesMockData.filter(
    (i) => i.constraint === ParticipationConstraint.PREMIUM,
  );

  const referenceSliderData = rafflesMockData.filter(
    (i) => i.constraint === ParticipationConstraint.REFERENCE,
  );

  const epinpaySliderData = rafflesMockData.filter((i) => i.creatorId === "1");

  const sliderData = [
    {
      title: "Premium üyelere özel çekilişler",
      raffles: premiumSliderData,
      line: 1,
    },
    {
      title: "Referanslı kullanıcılara özel çekilişler",
      raffles: referenceSliderData,
      line: 2,
    },
    {
      title: "Epinpay çekilişleri",
      raffles: epinpaySliderData,
      line: 3,
    },
  ];

  // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 300));

  return NextResponse.json({
    metadata: mockMetadata.find((m) => m.pageId === 3),
    data: {
      activeParticipantCount: 126,
      winners: rafflesWinnersMockData,
      faq: rafflesFaqMockData,
      sliders: sliderData,
      banners: {
        featured: featuredBannerData,
        streamers: streamerBannerData,
      },
    },
  });
}
