"use client";
import { Button } from "@/components/common";
import { useRouter } from "next/navigation";
import { Stream } from "../../streamers.types";
import StreamerCard from "./StreamerCard";

interface MainBannerLeftProps {
  data: Stream[];
  activeIndex: number;
  activeStream: string;
  onSelect: (index: number) => void;
}

export default function MainBannerLeft({
  data,
  activeIndex,
  activeStream,
  onSelect,
}: MainBannerLeftProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* TITLE */}
      <h2
        className="text-3xl font-bold leading-[150%] inline-block bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(98.1deg, #FFFFFF 55.9%, #BBF451 88.69%)",
        }}
      >
        Şimdi yayında
      </h2>

      {/* STREAMER CARDS */}
      <div className="space-y-1">
        <p className="text-white mb-2">Öne çıkan yayıncılar</p>
        {data.map((stream, index) => (
          <div key={stream.streamer.streamerId}>
            <StreamerCard
              key={stream.streamer.streamerId}
              data={stream}
              isActive={index === activeIndex}
              onSelect={() => onSelect(index)}
            />
            {activeStream === stream.streamURl && (
              <div className="md:hidden block animate-fade-in max-w-87.5 h-auto aspect-video rounded-2xl overflow-y-hidden shadow-2xl">
                <iframe
                  src={activeStream}
                  width="660"
                  height="338"
                  className="w-full h-full block"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                  title="Streamer yayını"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-2">
        <Button
          text="Tüm yayıncıları gör"
          variant="white"
          onClick={() => router.push("/streamers/all-streamers")}
          className="w-40"
          size="sm"
          padding="sm"
        />
        <Button
          text="Yayıncı ol"
          variant="tertiatry"
          onClick={() => router.push("/streamers/apply")}
          className="w-24"
          size="sm"
          padding="sm"
        />
      </div>
    </div>
  );
}
