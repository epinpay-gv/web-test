import { Stream, StreamerLeague } from "@/features/streamers/streamers.types";
import Image from "next/image";

const LEAGUE_IMAGE_SRC: Record<StreamerLeague, string> = {
    rookie: "/streamers/level-0.webp",
    bronze: "/streamers/level-1.webp",
    silver: "/streamers/level-2.webp",
    gold: "/streamers/level-3.webp",
    platinum: "/streamers/level-4.webp"
}

interface StreamerInfoProps {
  data: Stream;
}

export default function StreamerInfo({ data }: StreamerInfoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <Image
          src={data.avatar_url}
          alt={data.full_name}
          width={44}
          height={44}
          className="rounded-full"
        />
        {data.isEpinpayStreamer && data.streamerLeague && (
          <Image
            src={LEAGUE_IMAGE_SRC[data.streamerLeague]}
            alt={data.full_name}
            width={32}
            height={32}
            className="rounded-full absolute -right-2 -bottom-2 border-2 border-(--border-light-medium)"
          />
        )}
      </div>
      <div className="flex flex-col gap-4 text-white">
        <p className="text-xl leading-2">{data.full_name}</p>
        <p className="text-lg leading-2 text-(--text-body)">{data.nick_name}</p>
      </div>
    </div>
  );
}
