"use client";
import { useEffect, useRef, useState } from "react";
import { Stream } from "@/features/streamers/streamers.types";

const INTERVAL_MS = 10000; // 10s per streamer

export function useStreamerLoop(streams: Stream[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startLoop = () => {
    // Clear any existing timer before starting a new one
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % streams.length);
    }, INTERVAL_MS);
  };

  // Kick off the loop when streams are available
  useEffect(() => {
    if (!streams.length) return;
    startLoop();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [streams]);

  const selectStreamer = (index: number) => {
    setActiveIndex(index);
    startLoop(); // restart the interval from 0
  };

  const activeStream = streams[activeIndex] ?? null;

  return { activeIndex, activeStream, selectStreamer };
}