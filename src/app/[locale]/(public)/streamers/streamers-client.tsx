"use client";
import { BannerSection } from "@/features/raffles/components";
import {
  MainBannerLeft,
  MainBannerRight,
} from "@/features/streamers/components";
import { useStreamerLoop } from "@/features/streamers/hooks/useStreamerLoop";
import {
  Packages,
  Stream,
  Streamers,
} from "@/features/streamers/streamers.types";
import { FAQ } from "@/types/types";

interface StreamersClientPageProps {
  isLoading?: boolean;
  data: {
    mainBanner: Stream[];
    streams: Stream[];
    epinpayStreamer: Streamers[];
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

  return (
    <>
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
      {/* FORM BANNER */}
      {/* EPINPAY STREAMERS */}
      {/* STREAMER PACKAGES */}
      {/* HOW TO */}
      {/* FAQ */}
    </>
  );
}
