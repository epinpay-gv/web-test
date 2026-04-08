"use client";
import { BannerSection } from "@/features/raffles/components";
import {
  MainBannerLeft,
  MainBannerRight,
} from "@/features/streamers/components";
import { useStreamerLoop } from "@/features/streamers/hooks/useStreamerLoop";
import { Stream } from "@/features/streamers/streamers.types";

interface MainBannerSectionProps {
  data: Stream[];
}

export default function MainBannerSection({
  data,
}: MainBannerSectionProps) {
  const { activeIndex, activeStream, selectStreamer } = useStreamerLoop(data);

  return (
    <>
      <BannerSection
        accentColor="#8B0836"
        left={
          <MainBannerLeft
            data={data}
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
    </>
  );
}
