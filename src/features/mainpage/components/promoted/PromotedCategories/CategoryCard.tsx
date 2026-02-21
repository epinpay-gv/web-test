"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  backgroundImage?: string;
  slug: string;
}

export function CategoryCard({
  title,
  backgroundImage,
  slug,
}: CategoryCardProps) {
  return (
    <Link
      href={slug}
      className={cn(
        "relative block rounded-3xl overflow-hidden group",
        "transition-transform duration-300 hover:scale-105",
        "w-20.25 h-[56.8px] md:w-[123.5px] md:h-[86.7px]",
        !backgroundImage && "bg-(--bg-brand)",
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt={title}
          fill
          sizes="124px"
          className="
          object-cover object-top
          transition-transform duration-500
        "
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

      {/* Title */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <p
          className={`font-semibold text-sm leading-tight line-clamp-2 text-center ${backgroundImage ? "text-white" : "text-(--text-black)"}`}
        >
          {title}
        </p>
      </div>

      {/* Hover inner shadow */}
      <div
        className="
          absolute inset-0 pointer-events-none opacity-0
          group-hover:opacity-100 transition-opacity duration-300
          shadow-[inset_0_0_30px_8px_rgba(255,255,255,0.35)]
        "
      />
    </Link>
  );
}
