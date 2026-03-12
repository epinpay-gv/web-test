import { Winner } from "../../../raffle.types";
import ScrollColumn from "./ScrollColumn";

interface WinnersProps {
  data: Winner[];
}
export default function Winners({ data }: WinnersProps) {

  return (
    <section className="relative flex flex-col md:flex-row justify-between md:items-center w-full max-w-5xl md:rounded-xl bg-yellow-400 md:h-82.5">
      {/* LEFT SIDE */}
      <div className="text-yellow-950 text-2xl md:text-4xl font-bold z-10 p-6 md:p-10">
        <p>Gerçek katılımcılar</p>
        <p>Gerçek kazananlar</p>
      </div>

      {/* RIGHT SIDE — fixed height on mobile so animation has room */}
      <div className="z-10 flex gap-3 h-64 md:h-full">
        <ScrollColumn data={data} duration={data.length * 2} className="w-full pl-4"/>
        <ScrollColumn
          data={data}
          duration={data.length * 2}
          className="opacity-60 w-32 mask-[linear-gradient(to_right,black,transparent)]"
        />
      </div>
      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          background: `conic-gradient(from 179.93deg at 49.93% 50%, 
          #FFFFFF  0deg, 
          #CD8C00 54.38deg, 
          #FFC74F 100.21deg, 
          #CD8C00 148.57deg, 
          #FFFFFF  197.54deg, 
          #CD8C00 238.5deg, 
          #FFC74F 280deg, 
          #CD8C00 328.07deg, 
          #FFFFFF  360deg)`,
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
          backgroundSize: "800px",
          mixBlendMode: "soft-light",
          opacity: 0.3,
        }}
      />
    </section>
  );
}
