import Image from "next/image";
import { StreamPlatform } from "../../streamers.types";

interface PlatformCardProps {
  activePlatform: StreamPlatform;
  data: StreamPlatform;
  onClick: (value: string) => void;
}

export default function PlatformCard({ data, onClick }: PlatformCardProps) {
  return (
    <div
      onClick={() => onClick(data.platform_value)}
      className="cursor-pointer w-35 bg-(--bg-brand-softer) p-4 gap-2 flex border border-(--border-default-medium) rounded-lg shadow-xs"
    >
      <Image src={"/logos/logo-circle.webp"} alt={data.platform_label} width={28} height={28} />
      <div className="flex flex-col">
        <p className="text-xs text-(--text-body)">İzle</p>
        <p className="text-sm leading-5 font-bold">{data.platform_label}</p>
      </div>
    </div>
  );
}
