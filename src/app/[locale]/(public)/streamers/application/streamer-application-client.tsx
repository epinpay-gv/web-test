"use client";
import { BannerSection } from "@/features/raffles/components";
import {
  MainBannerLeft,
  MainBannerRight,
  Platforms,
  FormBanner,
  EpinpayStreamers,
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

interface StreamerApplicationClientPageProps {
  isLoading?: boolean;
  data: {
    mainBanner: Stream[];
    streams: { platforms: StreamPlatform[]; streams: Stream[] };
    epinpayStreamer: BasicStreamer[];
    packages: Packages[];
    faq: FAQ[];
  };
}

export default function StreamerApplicationClientPage({
  isLoading = false,
  data,
}: StreamerApplicationClientPageProps) {
  // MAIN BANNER DATA
  const { activeIndex, activeStream, selectStreamer } = useStreamerLoop(
    data.mainBanner,
  );

  // PLATFORMS DATA
  const { activePlatform, activeStreamList, selectPlatform } = usePlatform(
    data.streams.platforms,
    data.streams.streams,
  );

  return (
    <div className="flex flex-col items-center gap-10">
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
            key={activeStream?.streamerId}
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
      <EpinpayStreamers data={[]}/>
      {/* STREAMER PACKAGES */}
      {/* HOW TO */}
      {/* FAQ */}
    </div>
  );
}
