import { formatDateTR } from "@/lib/utils";
import { Winner } from "../../raffle.types";
import Image from "next/image";

interface WinnersProps {
  data: Winner[];
}
export default function Winners({ data }: WinnersProps) {
  return (
    <section className="relative flex justify-between items-center p-10 h-82.5 w-full max-w-5xl rounded-xl bg-yellow-400">
      {/* LEFT SIDE */}
      <div className="text-yellow-950 text-4xl font-bold">
        <p>Gerçek katılımcılar</p>
        <p>Gerçek kazananlar</p>
      </div>
      {/* RIGHT SIDE */}
      <div>
        {data.map((i, index) => (
          <div
            key={i.id}
            className={`rounded-xl flex justify-between p-4 shadow-xs w-67 h-auto`}
          >
            <p>{i.name}</p>
            <p>{formatDateTR(i.date)}</p>
          </div>
        ))}
      </div>

      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          background: `conic-gradient(from 179.93deg at 49.93% 50%, #FFFFFF 0deg, rgba(0, 0, 0, 0.61) 54.38deg, #FFFFFF 100.21deg, #000000 148.57deg, rgba(255, 255, 255, 0.99) 197.54deg, rgba(0, 0, 0, 0.96) 238.5deg, rgba(255, 255, 255, 0.92) 280deg, #000000 328.07deg, #FFFFFF 360deg)`,
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/raffles-page/banner-with-light-texture.webp')`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          mixBlendMode: "soft-light",
          opacity: 0.7,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/raffles-page/banner-comments-texture.webp')`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          mixBlendMode: "soft-light",
          opacity: 0.3,
        }}
      />
    </section>
  );
}
