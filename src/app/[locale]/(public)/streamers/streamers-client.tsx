"use client";
import { BannerSection } from "@/features/raffles/components";
import dynamic from "next/dynamic";
import {
  MainBannerLeft,
  MainBannerRight,
  FormBanner,
} from "@/features/streamers/components";

const Platforms = dynamic(() => import("@/features/streamers/components/Platforms/Platforms"), {
  ssr: false,
  loading: () => <div className="w-full h-80 animate-pulse bg-white/5 rounded-2xl" />
});

const EpinpayStreamers = dynamic(() => import("@/features/streamers/components/EpinpayStreamers/EpinpayStreamers"), {
  loading: () => <div className="w-full h-60 animate-pulse bg-white/5 rounded-2xl" />
});

const StreamerPackages = dynamic(() => import("@/features/streamers/components/StreamerPackages/StreamerPackages"), {
  loading: () => <div className="w-full h-96 animate-pulse bg-white/5 rounded-2xl" />
});

const ApplicationSteps = dynamic(() => import("@/features/streamers/components/ApplicationSteps/ApplicationSteps"), {
  loading: () => <div className="w-full h-40 animate-pulse bg-white/5 rounded-2xl" />
});

const FAQSection = dynamic(() => import("@/features/streamers/components/FAQSection/FAQSection"), {
  loading: () => <div className="w-full h-60 animate-pulse bg-white/5 rounded-2xl" />
});

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
      <div className="flex flex-col items-center md:gap-10 pb-10">
        {/* MAIN BANNER */}
        <BannerSection
          accentColor="#8B0836"
          left={
            <MainBannerLeft
              data={data.mainBanner}
              activeIndex={activeIndex}
              onSelect={selectStreamer}
              activeStream={activeStream?.streamURl ?? ""}
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
          allStreams={data.streams.streams}
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
        <ApplicationSteps />

        {/* FAQ */}
        <FAQSection data={data.faq} />
      </div>
    </div>
  );
}
