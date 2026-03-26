import { Packages } from "../../streamers.types";
import Image from "next/image";

const LEAGUE_IMAGE_SRC: Record<number, string> = {
  1: "/streamers/level-1.webp",
  2: "/streamers/level-2.webp",
  3: "/streamers/level-3.webp",
  4: "/streamers/level-4.webp",
};

interface PackageCardInfoProps {
  data: Packages;
}

export default function PackageCardInfo({ data }: PackageCardInfoProps) {
  return (
    <div className="md:w-40 shrink-0 flex justify-between md:block">
      <div className="flex flex-col gap-2 text-xl">
        <h3 className="font-semibold leading-5">{data.name}</h3>
        <p className="font-light text-(--text-body)">Yayıncı</p>
      </div>
      <Image
        src={LEAGUE_IMAGE_SRC[data.order_rank]}
        alt={data.name}
        width={156}
        height={156}
        className="object-cover"
      />
    </div>
  );
}
