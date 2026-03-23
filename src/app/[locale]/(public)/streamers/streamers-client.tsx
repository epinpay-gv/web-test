"use client";
import { BannerSection } from "@/features/raffles/components";
import {
  MainBannerLeft,
  MainBannerRight,
  Platforms,
  FormBanner,
  EpinpayStreamers,
  StreamerPackages,
  ApplicationSteps,
  FAQSection,
} from "@/features/streamers/components";
import { usePlatform } from "@/features/streamers/hooks/usePlatform";
import { useStreamerLoop } from "@/features/streamers/hooks/useStreamerLoop";
import {
  StreamPlatform,
  BasicStreamer,
  Packages,
  Stream,
} from "@/features/streamers/streamers.types";
import { FAQ } from "@/types/types";
import { useState } from "react";

interface StreamersClientPageProps {
  isLoading?: boolean;
  data: {
    mainBanner: Stream[];
    streams: { platforms: StreamPlatform[]; streams: Stream[] };
    epinpayStreamer: BasicStreamer[];
    packages: Packages[];
    faq: FAQ[];
  };
}

export default function StreamersClientPage({
  isLoading = false,
  data,
}: StreamersClientPageProps) {
  // MAIN BANNER DATA
  const { activeIndex, activeStream, selectStreamer } = useStreamerLoop(
    data.mainBanner,
  );

  // PLATFORMS DATA
  const { activePlatform, activeStreamList, selectPlatform } = usePlatform(
    data.streams.platforms,
    data.streams.streams,
  );

  //PACKAGES DATA
  const [selectedPackage, setSelectedPackage] = useState(data.packages[0].id);
  const selectPackage = (id: string) => {
    setSelectedPackage(id);
  };

  return (
    <div className="bg-(--bg-neutral-tertiary)">
      <div className="flex flex-col items-center gap-10 pb-10">
        {/* MAIN BANNER */}
        <BannerSection
          accentColor="#8B0836"
          left={
            <MainBannerLeft
              data={data.mainBanner}
              activeIndex={activeIndex}
              onSelect={selectStreamer}
            />
          }
          right={
            <MainBannerRight
              key={activeStream?.streamer.streamerId}
              data={activeStream?.streamURl ?? ""}
            />
          }
        />

        {/* PLATFORMS */}
        <Platforms
          activePlatform={activePlatform}
          platforms={data.streams.platforms}
          streamsToShow={activeStreamList}
          onClick={selectPlatform}
        />

        {/* FORM BANNER */}
        <FormBanner />

        {/* EPINPAY STREAMERS */}
        <EpinpayStreamers data={data.epinpayStreamer} />

        {/* STREAMER PACKAGES */}
        <StreamerPackages
          data={data.packages}
          selectedPackage={selectedPackage}
          onClick={selectPackage}
        />

        {/* HOW TO */}
        <ApplicationSteps/>
        
        {/* FAQ */}
        <FAQSection data={data.faq} />
      </div>
    </div>
  );
}
