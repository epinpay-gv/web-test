"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavCardConfig } from "@/components/layout/NavMenu/types/navmenu.types";

interface NavLinkCardProps {
  card: NavCardConfig;
  className?: string;
}

export default function NavLinkCard({ card, className }: NavLinkCardProps) {
  const {
    title,
    href,
    variant,
    decor,
    isBgImage = true,
    titleLocation = "top-left",
    titleColor,
  } = card;

  const content = (
    <motion.div
      initial="initial"
      whileHover="hover"
      transition={{
        type: "spring",
        mass: 1,
        stiffness: 300,
        damping: 20,
      }}
      className={cn(
        "relative overflow-hidden",
        "w-31.5 h-18 rounded-2xl py-2 px-3",
        isBgImage && "bg-[#1D303A]",
        className,
      )}
      variants={{
        initial: {
          backgroundColor: isBgImage ? variant.hoverBg : "transparent",
          border: "none",
          borderColor: "transparent",
        },
        hover: {
          backgroundColor: variant.hoverBg,
          border: "border border-2",
          borderColor: variant.hoverBorder,
          boxShadow: variant.hoverInsetShadow,
        },
      }}
    >
      {/* Pattern */}
      {isBgImage && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          variants={{
            initial: { opacity: 0.5 },
            hover: { opacity: 0 },
          }}
        >
          <div
            className="
              absolute -inset-[50%]
              bg-[url('/bg-image.webp')]
              bg-repeat 
              bg-center
              bg-size-[120px_300px]
              rotate-60 
              contrast-200 brightness-180
              "
          />
        </motion.div>
      )}

      {/* Title */}
      <span
        className={`absolute  ${titleColor ? `text-[${titleColor}]` : "text-white"} font-semibold text-sm z-10 ${titleLocation === "center" ? "top-6 left-8" : "top-3 left-3"}`}
      >
        {title}
      </span>

      {/* Decor */}
      <motion.div
        className="absolute z-10"
        variants={{
          initial: decor.animation.initial,
          hover: decor.animation.hover,
        }}
      >
        <Image
          src={decor.decorImage}
          alt={decor.decorImageAlt || ""}
          width={decor.width}
          height={decor.height}
          className="pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );

  return <Link href={href}>{content}</Link>;
}
