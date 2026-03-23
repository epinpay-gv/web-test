"use client";
import { useState } from "react";
import { Stream, StreamPlatform } from "@/features/streamers/streamers.types";

export function usePlatform(platforms: StreamPlatform[], streams: Stream[]) {
  const [activePlatform, setActivePlatform] = useState(platforms[0]);

  const selectPlatform = (value: string) => {
    const selected = platforms.find((i) => i.platform_value === value);
    setActivePlatform(selected ?? platforms[0]);
  };

  const activeStreamList =
    streams.filter((i) => i.platform_value === activePlatform.platform_value) ??
    null;

  return { activePlatform, activeStreamList, selectPlatform };
}
