import { StreamCard } from "@/components/common";
import { Stream, StreamPlatform } from "../../streamers.types";
import PlatformCard from "./PlatformCard";

interface PlatformsProps {
  platforms: StreamPlatform[];
  activePlatform: StreamPlatform;
  streamsToShow: Stream[];
  onClick: (value: string) => void;
}

export default function Platforms({
  platforms,
  activePlatform,
  streamsToShow,
  onClick,
}: PlatformsProps) {
  return (
    <div className="bg-(--bg-neutral-secondary-medium) py-16 mx-auto w-full">
      <div className="max-w-5xl flex flex-col gap-10 items-center mx-auto">
        <h2 className="text-4xl text-center">Platformlarımız</h2>
        {/* LABEL BUTTONS */}
        <div className="flex flex-wrap gap-2">
          {platforms?.map((i) => (
            <PlatformCard
              key={i.platform_value}
              data={i}
              onClick={onClick}
              activePlatform={activePlatform}
            />
          ))}
        </div>

        {/* VIDEO GRID */}
        <div className="grid grid-cols-3 gap-6">
          {streamsToShow?.map((i) => (
            <div key={i.streamerId}>
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
