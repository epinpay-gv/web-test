import { StreamCard } from "@/components/common";
import { Stream, StreamPlatform } from "../../streamers.types";
import PlatformCard from "./PlatformCard";

interface PlatformsProps {
  platforms: StreamPlatform[];
  activePlatform: StreamPlatform;
  streamsToShow: Stream[];
  allStreams: Stream[];
  onClick: (value: string) => void;
}

export default function Platforms({
  platforms,
  activePlatform,
  streamsToShow,
  allStreams,
  onClick,
}: PlatformsProps) {
  return (
    <div className="bg-(--bg-neutral-secondary-medium) pl-4 py-10 md:px-0 md:py-16 mx-auto w-full">
      <div className="max-w-5xl flex flex-col gap-10 md:items-center mx-auto">
        <h2 className="text-2xl md:text-4xl text-start md:text-center font-bold">Platformlarımız</h2>
        {/* LABEL BUTTONS */}
        <div className="flex md:flex-row md:justify-center flex-col gap-6 w-full">
          {platforms?.map((platform) => {
            const platformStreams = allStreams?.filter(
              (s) => s.platform_value === platform.platform_value,
            );

            return (
              <div key={platform.platform_value} className="w-full">
                <PlatformCard
                  data={platform}
                  onClick={onClick}
                  activePlatform={activePlatform}
                />

                {/* MOBILE STREAMS */}
                <div className="md:hidden flex gap-3 overflow-x-auto px-2 w-full">
                  {platformStreams?.map((s) => (
                    <div
                      key={s.streamer.streamerId}
                      className="min-w-62.5 shrink-0"
                    >
                      <StreamCard
                        data={s}
                        variant="detailed"
                        onClick={() => {}}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {/* VIDEO GRID */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {streamsToShow?.map((i) => (
            <div key={i.streamer.streamerId}>
              <StreamCard
                data={i}
                variant="detailed"
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
