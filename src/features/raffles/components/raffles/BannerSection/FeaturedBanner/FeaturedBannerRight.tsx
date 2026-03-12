import { BannerSectionData } from "@/features/raffles/raffle.types";

interface FeaturedBannerRightProps {
  data: BannerSectionData;
}
export default function FeaturedBannerRight({
  data,
}: FeaturedBannerRightProps) {
  // const current = data.participantCount;
  // const max = data.maxParticipants;
  // const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className="flex flex-col gap-6 items-center text-center mx-auto">
      {/* TITLE */}
      <div className="flex flex-col gap-2">
        <p className="text-xl md:text-2xl leading-[150%] text-white font-medium">
          Sınırlı sayıda çekilişler
        </p>
        <p className="text-2xl md:text-3xl leading-[150%] text-black font-bold ">
          Bitmeden al, şansını arttır
        </p>
      </div>

      {/* CREATOR */}
      <p>
        Oluşturan <span className="underline">Epinpay</span>
      </p>

      {/* COUNTDOWN */}
      <div className="py-3 px-4 gap-1.5 w-68 h-14 bg-black/64 rounded-lg">
        <div className="flex justify-between">
          <p>
            752 <span className="text-(--text-body)">mevcut katılımcı</span>
          </p>
          <p>1000</p>
        </div>
        {/* Track */}
        <div className="h-2.5 rounded-full w-full bg-(--bg-neutral-primary-soft)">
          {/* Fill */}
          <div
            className="h-full rounded-full bg-linear-to-r from-white from-80% to-[#F62F61] via-20% transition-all duration-500"
            style={{ width: `${(752 / 1000) * 100}%` }}
            // style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
