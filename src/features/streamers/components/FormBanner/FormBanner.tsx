
import { Button } from "@/components/common";
import Image from "next/image";

export default function FormBanner() {
  return (
    <div
      className="relative overflow-hidden w-full h-auto md:w-5xl md:h-101.5 bg-(--bg-brand) flex flex-col md:flex-row items-center gap-4 py-10 px-20 
    md:rounded-xl text-black"
      style={{ backgroundColor: "#06D6FF" }}
    >
      {/* TITLE */}
      <div className="text-center max-w-83.5 space-y-4 z-1">
        <h2 className="text-3xl font-bold leading-[150%]">
          Birlikte büyümeye ne dersin?
        </h2>
        <p>
          Epinpay ailesine katıl, yayınlarını profesyonel bir kazanç kapısına
          dönüştür!
        </p>
        <Button
          variant="white"
          text="Yayıncı ol, Aramıza katıl!"
          size="lg"
          className="w-50 mt-2"
        />
      </div>
      {/* LEFT IMAGES */}
      <div className="relative w-full h-75 md:h-full flex items-end justify-end">
        <div className="absolute bottom-0 right-0 z-10">
          <Image
            src="/streamers/circle-graphics.webp"
            alt="circle graphics"
            width={514}
            height={514}
            className="w-70 md:w-128.5 h-auto"
          />
        </div>
        {/* CIRCLES */}
        <div className="absolute right-[-80%] md:right-[-30%] bottom-[-80%] md:bottom-[-20%] z-0 w-162.5 h-162.5 rounded-full border-[#00BBE5] border-2 shadow-[0_0_0_16px_#FFFFFF40]" />
        <div className="absolute right-[-20%] md:right-[-10%] bottom-[-25%] md:bottom-[10%] z-0 w-92.5 h-92.5 rounded-full border-[#00BBE5] border-2 shadow-[0_0_0_16px_#FFFFFF40]" />
        <div className="absolute right-[5%] bottom-[-5%] md:bottom-[35%] z-0 w-57.5 h-57.5 rounded-full border-[#00BBE5] border-2 shadow-[0_0_0_16px_#FFFFFF40]" />
      </div>

      {/* BG TEXTURES */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `conic-gradient(
           from 183.37deg at 86.87% 36.82%,
           #000000 -31.93deg,
           rgba(255, 255, 255, 0.85) 4.92deg,
           rgba(0, 0, 0, 0.61) 54.38deg,
           rgba(255, 255, 255, 0.8) 100.21deg,
           #000000 148.57deg,
           rgba(255, 255, 255, 0.83) 197.54deg,
           rgba(0, 0, 0, 0.96) 238.5deg,
           rgba(255, 255, 255, 0.69) 280deg,
           #000000 328.07deg,
           rgba(255, 255, 255, 0.85) 364.92deg
          )`,
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
    </div>
  );
}
