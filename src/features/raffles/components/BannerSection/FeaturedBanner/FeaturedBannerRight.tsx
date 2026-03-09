import { Button } from "@/components/common";
import { BannerSectionData } from "@/features/raffles/raffle.types";

interface FeaturedBannerRightProps {
  data: BannerSectionData;
}
export default function FeaturedBannerRight({
  data,
}: FeaturedBannerRightProps) {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <p className="text-2xl leading-[150%] text-white font-medium">
        Sınırlı sayıda çekilişler
      </p>
      <p className="text-3xl leading-[150%] text-black font-bold ">
        Bitmeden al, şansını arttır
      </p>
      <p>
        Oluşturan <span className="underline">Epinpay</span>
      </p>
      <div className="py-3 px-4 gap-1.5 w-68 h-14 bg-black/64 rounded-xl"></div>
      {/* <Button text="Katıl" className="max-w-18.5" variant="white"/> */}
    </div>
  );
}
