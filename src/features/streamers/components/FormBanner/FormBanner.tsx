import { Button } from "@/components/common";
import Image from "next/image";

export default function FormBanner() {
  return (
    <div className="md:w-5xl md:h-101.5 bg-(--bg-brand) flex items-center gap-4 py-10 px-20 rounded-xl text-black">
      {/* TITLE */}
      <div className="text-center max-w-83.5 space-y-4">
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
      {/* IMAGES */}
      <div>
        <Image
          src="/streamers/circle-graphics.webp"
          alt="circle graphics"
          width={514}
          height={514}
        />
      </div>
    </div>
  );
}
