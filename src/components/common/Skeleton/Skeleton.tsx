"use client";

interface SkeletonProps {
  className?: string;
  show?: boolean; 
  children?: React.ReactNode;
}

export function Skeleton({ className, show = false, children }: SkeletonProps) {
  if (show) return <>{children}</>;
  return (
    <div
      className={`animate-pulse bg-gray-700/40 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-linear-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`}
    />
  );
}