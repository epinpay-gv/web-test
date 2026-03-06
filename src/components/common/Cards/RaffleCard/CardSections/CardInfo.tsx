import { Raffle } from "../types";

interface CardInfoProps {
  card: Raffle;
  orientation?: "horizontal" | "vertical";
}

export default function CardInfo({ card, orientation = "vertical" }: CardInfoProps) {
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
  return (
    <div className={`${orientation === "vertical" ? "" : "py-4"} flex flex-col px-4 gap-4 `}>
      {/* TITLE */}
      <p className={`${orientation === "vertical" ? "text-(--text-heading)" : "text-(--text-black) w-37.25"} h-10.5 text-sm font-semibold leading-[150%] `}>
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

      {/* BUTTON */}
      <button className={`${orientation === "vertical" ? "w-48 h-14" : "w-37.25 h-14.5"} cursor-pointer text-xs font-base rounded-lg py-1.5 px-3 bg-(--bg-brand) shadow-xs flex flex-col gap-1 items-center`}>
        <p className="text-black leading-5">Hemen katıl</p>
        <div className="rounded-sm py-0.5 px-2 bg-(--bg-brand-soft) text-(--text-fg-brand) leading-4">
          Son {} dakika
        </div>
      </button>
    </div>
  );
}
