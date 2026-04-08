"use client";
import StreamerInfo from "@/components/common/Cards/StreamCard/CardSections/StreamerInfo";
import { useRouter } from "next/navigation";
import { Stream } from "@/features/streamers/streamers.types";
import { getOptimizedStreamUrl } from "@/features/streamers/utils/stream.utils";
import SupportCard from "@/components/common/Cards/StreamCard/SupportCard";

interface StreamerClientPageProps {
  isLoading?: boolean;
  data: Stream;
}
const handleSupport = (amount: number, message: string) => {
  console.log('Destek:', { amount, message });
};

export default function StreamerClientPage({
  data,
  isLoading = false,
}: StreamerClientPageProps) {
  const router = useRouter();

  if (!data) return null;

  return (
    <div className="max-w-5xl mx-3 lg:mx-auto py-8 mb-15 flex flex-col lg:flex-row gap-8 lg:max-h-137">

      {/* Sol kolon — desktop: w-100 sabit, mobil: full width, order-1 */}
      <div className="w-full lg:w-100 order-1 lg:order-none">
        <h2
          className="text-3xl font-bold leading-[150%] inline-block bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(98.1deg, #FFFFFF 55.9%, #BBF451 88.69%)",
          }}
        >
          Şimdi yayında
        </h2>
        <StreamerInfo variant="profile" data={data.streamer} />

        {/* Desktop'ta burada görünür */}
        <div className="hidden lg:block">
          <SupportCard
            userName="BA Burak"
            userInitials="BA"
            onSupport={handleSupport}
          />
        </div>
      </div>

      {/* iframe — desktop: sağ kolon, mobil: order-2 (ortada) */}
      <div className="self-center flex items-center justify-center w-full lg:min-w-150 h-52 sm:h-72 lg:h-87 aspect-video rounded-3xl overflow-hidden shadow-2xl  border-2 lg:border-[8px] border-[#FFFFFF66]/40 order-2 lg:order-none">
        <iframe
          src={`${getOptimizedStreamUrl(data.streamURl)}${data.streamURl.includes("?") ? "&" : "?"}autoplay=1`}
          className="w-full h-full"
          allowFullScreen
          allow="autoplay; fullscreen"
          title={data.streamer.full_name}
        />
      </div>

      {/* SupportCard — sadece mobilde, order-3 (en altta) */}
      <div className="block lg:hidden order-3">
        <SupportCard
          userName="BA Burak"
          userInitials="BA"
          onSupport={handleSupport}
        />
      </div>

    </div>
  );
}