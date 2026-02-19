"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavCardVariant {
  hoverBg: string;
  hoverBorder?: string;
  hoverInsetShadow?: string;
}

interface NavLinkCardProps {
  title: string;
  variant: NavCardVariant;
  href?: string;
  decorImage: string;
  className?: string;
}

export default function NavLinkCard({
  title,
  variant,
  href,
  decorImage,
  className,
}: NavLinkCardProps) {
  const content = (
    <motion.div
      initial={false}
      whileHover={{
        backgroundColor: variant.hoverBg,
        borderColor: variant.hoverBorder,
        boxShadow: variant.hoverInsetShadow,
      }}
      transition={{
        type: "spring",
        mass: 1,
        stiffness: 300,
        damping: 20,
      }}
      className={cn(
        "group relative overflow-hidden",
        "w-31.5 h-18 rounded-lg",
        "border border-transparent",
        "bg-[#1D303A]",
        className,
      )}
    >
      {/* BG Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/navMenu/bg-image.png"
          alt=""
          fill
          className=" object-cover rotate-2 scale-125 mix-blend-luminosity opacity-60 pointer-events-none"
        />
      </div>

      {/* Title */}
      <span className="absolute top-3 left-3 text-white font-semibold text-sm z-10">
        {title}
      </span>

      {/* Decor */}
      <div className="absolute bottom-2 right-2 z-10">
        <Image
          src={decorImage}
          alt=""
          width={48}
          height={48}
          className="pointer-events-none"
        />
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
