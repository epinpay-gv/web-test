"use client";

import {
  BannerSection,
  MainBannerLeft,
  MainBannerRight,
  SliderSection,
  StreamerBannerRight,
  StreamerBannerLeft,
  FeaturedBannerRight,
  FeaturedBannerLeft,
} from "@/features/raffles/components";
import {
  Winner,
  SliderSectionData,
  BannerSectionData,
} from "@/features/raffles/raffle.types";
import { FAQ } from "@/types/types";
import { useState } from "react";

interface RafflesClientProps {
  data: {
    activeParticipantCount: number;
    winners: Winner[];
    faq: FAQ[];
    sliders: SliderSectionData[];
    banners: {
      featured: BannerSectionData;
      streamers: BannerSectionData[];
    };
  };
}

export default function RafflesClientPage({ data }: RafflesClientProps) {
  // PAGE DATA
  const { activeParticipantCount, winners, faq, sliders, banners } = data;
  const { featured, streamers } = banners;

  const slider1Data = sliders.find((i) => i.line === 1);
  const slider2Data = sliders.find((i) => i.line === 2);
  const slider3Data = sliders.find((i) => i.line === 3);

  // STREAMER BANNER
  const [selectedStreamer, setSelectedStreamer] = useState("101");

  const handleStreamerChange = (id: string) => {
    return setSelectedStreamer(id);
  };

  return (
    <>
      <BannerSection
        background="brand"
        left={<MainBannerLeft data={activeParticipantCount} />}
        right={<MainBannerRight />}
      />
      {slider1Data && <SliderSection data={slider1Data} />}
      <BannerSection
        background="with-light"
        accentColor="#8B0836"
        left={
          <StreamerBannerLeft
            data={streamers}
            selectedId={selectedStreamer}
            onSelect={handleStreamerChange}
          />
        }
        right={
          <StreamerBannerRight data={streamers} selectedId={selectedStreamer} />
        }
      />
      {slider2Data && <SliderSection data={slider2Data} />}

      <BannerSection
        background="with-light"
        accentColor="#615FFF"
        left={<FeaturedBannerLeft data={featured}/>}
        right={<FeaturedBannerRight data={featured}/>}
      />

      {/* <DescriptionCards /> */}
      {/* <SliderSection /> */}
      {/* <Winners /> */}
      {/* <FAQSection /> */}
    </>
  );
}
