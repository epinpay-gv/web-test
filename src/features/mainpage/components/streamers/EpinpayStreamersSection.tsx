"use client";
import dynamic from "next/dynamic";

const EpinpayStreamers = dynamic(
  () =>
    import("@/features/streamers/components/EpinpayStreamers/EpinpayStreamers"),
  {
    loading: () => (
      <div className="w-full h-60 animate-pulse bg-white/5 rounded-2xl" />
    ),
  },
);

import {
  BasicStreamer,
} from "@/features/streamers/streamers.types";
interface EpinpayStreamersSectionProps {
  data: BasicStreamer[];
}

export default function EpinpayStreamersSection({
  data,
}: EpinpayStreamersSectionProps) {
  return (
    <>
      <EpinpayStreamers data={data} />
    </>
  );
}
