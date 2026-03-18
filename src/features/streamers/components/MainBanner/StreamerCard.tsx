import Image from "next/image";
import { Stream } from "../../streamers.types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common";

interface StreamerCardProps {
  data: Stream;
  isActive: boolean;
  onSelect: () => void;
}

export default function StreamerCard({
  data,
  isActive,
  onSelect,
}: StreamerCardProps) {
  const router = useRouter();
  return (
    <div
      onClick={onSelect}
      className={`min-w-100 flex items-center justify-between p-4 gap-2 ${isActive ? "bg-white/16 rounded-xl" : ""}`}
    >
      <div className="flex items-center gap-2.5">
        <Image
          src={data.avatar_url}
          alt={data.full_name}
          width={56}
          height={56}
          className="rounded-full"
        />
        <div className="flex flex-col gap-4 text-white">
          <p className="text-xl leading-2">{data.full_name}</p>
          <p className="text-lg leading-2">{data.nick_name}</p>
        </div>
      </div>

      {isActive && (
        <Button
          text="Destek ol"
          onClick={() => router.push("/streamers/apply")}
          className="max-w-25"
        />
      )}
    </div>
  );
}
