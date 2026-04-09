import { NextResponse } from "next/server";
import {
  mockMetadata,
  rafflesMockData,
  rafflesFaqMockData,
  rafflesWinnersMockData,
} from "@/mocks";
import { ParticipationConstraint } from "@/types/types";

// Mevcut GET fonksiyonun olduğu gibi kalsın...
export async function GET() {
  // ... (Senin paylaştığın GET kodları burada duracak)
  const epinpayRaffles = rafflesMockData.filter((i) => i.creatorId === "1");
  const featuredBannerData = { id: "1", name: "Epinpay Raffles", image: "", raffle: epinpayRaffles };
  const STREAMER_IDS = ["101", "102", "103", "104", "105", "106"];
  const streamerBannerData = rafflesMockData
    .filter((i) => STREAMER_IDS.includes(i.creatorId))
    .map((i) => ({ id: i.creatorId, name: i.creator.name, image: i.creator.image, raffle: i }));
  const premiumSliderData = rafflesMockData.filter((i) => i.constraint === ParticipationConstraint.PREMIUM);
  const referenceSliderData = rafflesMockData.filter((i) => i.constraint === ParticipationConstraint.REFERENCE);
  const epinpaySliderData = rafflesMockData.filter((i) => i.creatorId === "1");
  const sliderData = [
    { title: "Premium üyelere özel", raffles: premiumSliderData, line: 1 },
    { title: "Referanslı kullanıcılara özel", raffles: referenceSliderData, line: 2 },
    { title: "Epinpay çekilişleri", raffles: epinpaySliderData, line: 3 },
  ];

  await new Promise((r) => setTimeout(r, 300));

  return NextResponse.json({
    metadata: mockMetadata.find((m) => m.pageId === 3),
    data: {
      activeParticipantCount: 126,
      winners: rafflesWinnersMockData,
      faq: rafflesFaqMockData,
      sliders: sliderData,
      banners: { featured: featuredBannerData, streamers: streamerBannerData },
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();  
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Yeni Çekiliş Oluşturuluyor (API):", body);
    return NextResponse.json({
      success: true,
      message: "Çekiliş başarıyla oluşturuldu.",
      data: { id: "simulated-raffle-" + Math.random().toString(36).substr(2, 9) }
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: "Geçersiz veri formatı" 
    }, { status: 400 });
  }
}