import { Packages } from "../../streamers.types";
import Image from "next/image";

const LEAGUE_IMAGE_SRC: Record<number, string> = {
  1: "/streamers/level-1.webp",
  2: "/streamers/level-2.webp",
  3: "/streamers/level-3.webp",
  4: "/streamers/level-4.webp",
};

interface PackageCardProps {
  data: Packages;
  isOpen: boolean;
  onClick: (id: string) => void;
}

export default function PackageCard({
  data,
  isOpen = false,
  onClick,
}: PackageCardProps) {
  if (!isOpen)
    return (
      <div
        onClick={() => onClick(data.id)}
        className="cursor-pointer z-30 overflow-x-hidden p-4 rounded-lg relative h-75 w-23.75 bg-(--bg-neutral-primary)"
      >
        <div className="flex flex-col gap-2 text-xl">
          <h3 className="font-semibold leading-5">{data.name}</h3>
          <p className="font-light text-(--text-body) leading-5">Yayıncı</p>
        </div>
        <Image
          src={LEAGUE_IMAGE_SRC[data.order_rank]}
          alt={data.name}
          width={156}
          height={156}
          className="object-cover absolute bottom-0 -right-8 opacity-60"
        />
      </div>
    );

  return (
    <div className="z-20 rounded-lg h-75 w-172.5 bg-(--bg-brand-soft) p-4 flex justify-between gap-4">
      {/* IMAGE */}
      <div className="relative w-full">
        <div className="flex flex-col gap-2 text-xl">
          <h3 className="font-semibold leading-5">{data.name}</h3>
          <p className="font-light text-(--text-body) leading-5">Yayıncı</p>
        </div>
        <Image
          src={LEAGUE_IMAGE_SRC[data.order_rank]}
          alt={data.name}
          width={156}
          height={156}
          className="object-cover absolute -bottom-4"
        />
      </div>

      {/* CRITERIA + REWARD */}
      <div className="flex flex-col justify-center gap-4 w-full">
        {data.detail_criteria.map((item) => (
          <div key={item.id}>
            <p className="text-(--text-body) text-sm font-medium leading-[150%]">
              {item.name} :
            </p>
            <p className="text-lg font-bold leading-[130%]">{item.value}</p>
          </div>
        ))}
        <div>
          <p className="text-(--text-body) text-sm font-medium leading-[150%]">
            Aylık Ödül
          </p>
          <p className="text-(--text-fg-yellow) text-lg font-bold leading-[130%]">
            {data.rewardMin}
            {data.rewardCurrenct} / {data.rewardMax}
            {data.rewardCurrenct}
          </p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="flex md:flex-col justify-center min-w-75 gap-4">
        <p className="text-lg font-bold leading-[130%]">Hedefler</p>
        <ul>
          {data.description.map((item, index) => (
            <li
              key={index}
              className="text-(--text-body) text-sm font-normal leading-[150%]"
            >
              - {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
