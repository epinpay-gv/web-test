import { getTimeLeft } from "@/lib/utils";
import { Raffle } from "@/types/types";

interface CardInfoProps {
  card: Raffle;
  isLoading?: boolean;
  type?: "special" | "default";
  orientation?: "horizontal" | "vertical";
}

export default function CardInfo({
  card,
  isLoading = true,
  type = "special",
  orientation = "vertical",
}: CardInfoProps) {
  const raffleInfo = [
    {
      title: "Ödül Değeri",
      value: `${card.totalCost ?? 0} $`,
      class: "text-(--text-fg-success-strong)",
    },
    {
      title: "Katılımcı",
      value: `${card.participationCount} kişi`,
      class: "text-(--text-fg-brand-subtle)",
    },
  ];

  //SKELETON
  if (isLoading) {
    return (
      <div
        className={`${orientation === "vertical" ? "" : "py-4"} flex flex-col px-2 md:px-4 gap-2 md:gap-4`}
      >
        {/* TITLE */}
        <div className="space-y-1">
          <div className="w-full h-4 shimmer bg-gray-200 rounded-full" />
          <div className="w-3/4 h-4 shimmer bg-gray-200 rounded-full" />
        </div>

        {/* INFO */}
        <div className="flex justify-around w-full">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col gap-1 items-center">
              <div className="w-12 h-3 shimmer bg-gray-200 rounded-full" />
              <div className="w-16 h-4 shimmer bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>

        {/* ACTION */}
        <div className="w-full h-13 md:h-14 shimmer bg-gray-200 rounded-lg" />
      </div>
    );
  }

  return (
    <>
      <div
        className={`${orientation === "vertical" ? "" : "py-4"} flex flex-col px-2 md:px-4 gap-2 md:gap-4 `}
      >
        {/* TITLE */}
        <p
          className={`${orientation === "vertical" ? "text-(--text-heading)" : "text-(--text-black) w-37.25"} h-10.5 text-sm font-semibold leading-[150%] `}
        >
          {card.title}
        </p>

        {/* INFO */}
        <div className="flex justify-around w-full">
          {raffleInfo.map((i, index) => (
            <div key={index} className="flex flex-col gap-0 items-center">
              <p className="text-xs text-(--text-body) leading-[150%])">
                {i.title}
              </p>
              <p className={`text-sm font-bold leading-[150%] ${i.class}`}>
                {i.value}
              </p>
            </div>
          ))}
        </div>

        {/* ACTION DIV */}
        {card.status === "ACTIVE" && (
          <div
            className={`${orientation === "vertical" && type === "special" ? "w-full h-13 md:h-14" : "w-full h-14.5"} 
        cursor-pointer text-xs font-base rounded-lg py-0.5 md:py-1.5 px-3 bg-(--bg-brand) shadow-xs flex flex-col gap-1 items-center`}
          >
            <p className="text-black leading-5">Hemen katıl</p>
            <div className="rounded-sm py-0.5 px-2 bg-(--bg-brand-soft) text-(--text-fg-brand) leading-4">
              Son {getTimeLeft(card.endDate)}
            </div>
          </div>
        )}

        {card.status !== "ACTIVE" && (
          <div className=" w-full h-13 md:h-14.5 text-xs font-base rounded-lg bg-(--bg-orange) shadow-xs flex items-center justify-center">
            <p className="text-black leading-5">Sona erdi</p>
          </div>
        )}
      </div>
    </>
  );
}
