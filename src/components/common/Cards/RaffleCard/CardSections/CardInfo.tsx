import { Raffle } from "../types";

interface CardInfoProps {
  card: Raffle;
}

export default function CardInfo({ card }: CardInfoProps) {
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
    <div className="flex flex-col px-4 gap-4">
      {/* TITLE */}
      <p className="h-10.5 text-sm font-semibold leading-[150%] text-(--text-heading)">
        {card.title}
      </p>

      {/* INFO */}
      <div className="flex justify-around w-full">
        {raffleInfo.map((i, index) => (
          <div key={index} className="flex flex-col gap-0 items-center">
            <p className="text-xs text-(--text-body leading-[150%])">
              {i.title}
            </p>
            <p className={`text-sm font-bold leading-[150%] ${i.class}`}>
              {i.value}
            </p>
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <button className="cursor-pointer text-xs font-base w-48 h-14 rounded-lg py-1.5 px-3 bg-(--bg-brand) shadow-xs flex flex-col gap-1 items-center">
        <p className="text-black leading-5">Hemen katıl</p>
        <div className="rounded-sm py-0.5 px-2 bg-(--bg-brand-soft) text-(--text-fg-brand) leading-4">
          Son {} dakika
        </div>
      </button>
    </div>
  );
}
