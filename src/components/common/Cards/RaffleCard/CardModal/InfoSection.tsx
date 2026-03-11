"use client";
import { getTimeLeft } from "@/lib/utils";
import { Raffle } from "../types";
import { JoinRaffleApiPayload } from "@/features/raffles/raffle.types";

interface InfoSectionProps {
  card: Raffle;
  joinToTheRaffle: (payload: JoinRaffleApiPayload) => Promise<void>;
}

export default function InfoSection({
  card,
  joinToTheRaffle,
}: InfoSectionProps) {
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

  const payload = {
    raffleId: card.id,
  };

  return (
    <div className="flex flex-col px-4 gap-4 w-full justify-between">
      {/* TITLE */}
      <p className="text-white w-full h-10.5 text-sm font-semibold leading-[150%]">
        {card.title}
      </p>

      <div className="flex flex-col gap-4">
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

        {/* BUTTON - ACTIVE */}
        {card.status === "ACTIVE" && (
          <button
            className=" w-full h-14.5 cursor-pointer text-xs font-base rounded-lg py-1.5 px-3 bg-(--bg-brand) shadow-xs flex flex-col gap-1 items-center"
            onClick={() => joinToTheRaffle(payload)}
          >
            <p className="text-black leading-5">Hemen katıl</p>
            <div className="rounded-sm py-0.5 px-2 bg-(--bg-brand-soft) text-(--text-fg-brand) leading-4">
              Son {getTimeLeft(card.endDate)}
            </div>
          </button>
        )}

        {/* DIV - ENDED */}
        {card.status !== "ACTIVE" && (
          <div className=" w-full h-14.5 text-xs font-base rounded-lg py-1.5 px-3 bg-(--bg-orange) shadow-xs flex items-center justify-center">
            <p className="text-black leading-5">Sona erdi</p>
          </div>
        )}
      </div>
    </div>
  );
}
