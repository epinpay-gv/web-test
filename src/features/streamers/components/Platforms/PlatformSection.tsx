"use client";
import dynamic from "next/dynamic";
import { StreamPlatform, Stream } from "../../streamers.types";

const Platforms = dynamic(() => import("./Platforms"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 animate-pulse bg-white/5 rounded-2xl" />
  ),
});

interface PlatformSectionProps {
  data: { platforms: StreamPlatform[]; streams: Stream[] };
}

export default function PlatformSection({ data }: PlatformSectionProps) {
  return <Platforms data={data} />;
}