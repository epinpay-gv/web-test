"use client";
import StreamerInfo from "@/components/common/Cards/StreamCard/CardSections/StreamerInfo";
import { useRouter } from "next/navigation";
import { Stream } from "@/features/streamers/streamers.types";
import { getOptimizedStreamUrl } from "@/features/streamers/utils/stream.utils";

interface StreamerClientPageProps {
  isLoading?: boolean;
  data: Stream;
}

export default function StreamerClientPage({
  data,
  isLoading = false,
}: StreamerClientPageProps) {
  const router = useRouter();

  if (!data) return null;

  return (
    <div className="container mx-auto px-4 py-8 flex gap-8">
      <div className="h-25 w-full bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10">
        <StreamerInfo data={data.streamer} />
      </div>

      <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-black/40">
        <iframe
          src={`${getOptimizedStreamUrl(data.streamURl)}${data.streamURl.includes("?") ? "&" : "?"}autoplay=1`}
          className="w-full h-full"
          allowFullScreen
          allow="autoplay; fullscreen"
          title={data.streamer.full_name}
        />
      </div>
    </div>
  );
}
