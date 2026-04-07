"use client"
import { StreamCard } from "@/components/common";
import { Stream, StreamPlatform } from "../../streamers.types";
import PlatformCard from "./PlatformCard";
import { usePlatform } from "../../hooks/usePlatform";

interface PlatformsProps {
  data: { platforms: StreamPlatform[]; streams: Stream[] };
}

export default function Platforms({ data }: PlatformsProps) {
  const { activePlatform, activeStreamList, selectPlatform } = usePlatform(
    data.platforms,
    data.streams,
  );

  return (
    <div className="bg-(--bg-neutral-secondary-medium) pl-4 py-10 md:px-0 md:py-16 mx-auto w-full">
      <div className="max-w-5xl flex flex-col gap-10 md:items-center mx-auto">
        <h2 className="text-2xl md:text-4xl text-start md:text-center font-bold">
          Platformlarımız
        </h2>
        {/* LABEL BUTTONS */}
        <div className="flex md:flex-row md:justify-center flex-col gap-6 w-full">
          {data.platforms?.map((platform) => {
            const platformStreams = data.streams?.filter(
              (s) => s.platform_value === platform.platform_value,
            );

            return (
              <div key={platform.platform_value} className="w-full">
                <PlatformCard
                  data={platform}
                  onClick={selectPlatform}
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
          {activeStreamList?.map((i) => (
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
