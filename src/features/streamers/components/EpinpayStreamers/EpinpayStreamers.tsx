import { BasicStreamer } from "../../streamers.types";
import StreamerInfo from "@/components/common/Cards/StreamCard/CardSections/StreamerInfo";

interface EpinpayStreamersProps {
  data: BasicStreamer[];
}

export default function EpinpayStreamers({ data }: EpinpayStreamersProps) {
  return (
    <section className="w-full relative overflow-hidden py-10 md:py-16 px-4 md:px-0">
      {/* CONTENT */}
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
        <h2 className="text-4xl text-center font-bold">Yayıncılarımız</h2>
        <div
          className="grid grid-cols-2 md:grid-cols-5 max-w-5xl w-full gap-8">
          {data.map((item) => (
            <StreamerInfo
              key={item.streamerId}
              data={item}
              size="lg"
              variant="detailed"
            />
          ))}
        </div>
      </div>

      {/* BG IMAGES */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(73.99% 259.88% at 28.85% 70.24%, rgba(255, 255, 255, 0.3416) 0%, rgba(255, 255, 255, 0.448) 30.29%, rgba(0, 187, 229, 0.56) 80.77%)`,
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url('/raffles-page/banner-with-light-texture.webp')`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          mixBlendMode: "soft-light",
          opacity: 0.3,
        }}
      />
    </section>
  );
}
