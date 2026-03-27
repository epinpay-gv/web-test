import { Stream } from "../../streamers.types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common";
import StreamerInfo from "@/components/common/Cards/StreamCard/CardSections/StreamerInfo";
import { Cash } from "flowbite-react-icons/outline";

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
      className={`z-1 md:min-w-100 flex items-center justify-between p-4 gap-2 ${isActive ? "bg-white/16 rounded-xl" : ""}`}
    >
      <StreamerInfo data={data.streamer}/>

      {isActive && (
        <Button
          text="Destek ol"
          onClick={() => router.push(`/streamers/${data.streamer.streamerId}`)}
          className="max-w-32 gap-2"
          padding="xs"
          iconLeft={<Cash size={16}/>}
          variant="dark"
        />
      )}
    </div>
  );
}
