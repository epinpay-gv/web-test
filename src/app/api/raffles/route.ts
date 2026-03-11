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
  const epinpayRaffles = rafflesMockData.filter((i) => i.creatorId === "1");

  const featuredBannerData = {
    id: "1",
    name: "Epinpay Raffles",
    image: "",
    raffle: epinpayRaffles,
  };

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
      title: `<div style="background-image: radial-gradient(178.85% 100% at 100% 0%, #FFC74F 0%, #FFC74F 20%, #CD8C00 40%, #FFC74F 60%, #CD8C00 80%, #FFC74F 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; display: inline-block; font-weight: bold;">Premium üyelere özel <span style="-webkit-text-fill-color: white; color: white;">çekilişler</span></div>`,
      raffles: premiumSliderData,
      line: 1,
    },
    {
      title: `<div style="background-image: conic-gradient(from 179.93deg at 49.93% 50%, #FFFFFF 0deg, #888888 54.38deg, #FFFFFF 100.21deg, #888888 148.57deg, #FFFFFF 197.54deg, #888888 238.5deg, #FFFFFF 280deg, #888888 328.07deg, #FFFFFF 360deg); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; display: inline-block; font-weight: bold;">Referanslı kullanıcılara özel <span style="-webkit-text-fill-color: white; color: white;">çekilişler</span></div>`,
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
