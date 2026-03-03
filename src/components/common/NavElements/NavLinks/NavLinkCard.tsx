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
    secondDecor,
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
        bounce: 1,
      }}
      className={cn(
        "relative overflow-hidden",
        "w-32.5 h-19 rounded-2xl py-2 px-3",
        className,
      )}
      variants={{
        initial: {
          borderWidth: 2,
          borderColor: "transparent",
          borderStyle: "solid",
        },
        hover: {
          borderWidth: 2,
          borderColor: variant.hoverBorder,
          borderStyle: "solid",
          boxShadow: variant.hoverInsetShadow,
        },
      }}
    >
      {/* Title */}
      <span
        className={`absolute font-semibold text-sm z-50 ${titleLocation === "center" ? "top-6 left-8" : "top-2 left-3"}`}
        style={{ color: titleColor }}
      >
        {title}
      </span>

      {/* Pattern */}
      {isBgImage && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ isolation: "isolate" }}
        >
          {/* Layer 1 Color  */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: variant.hoverBg }}
          />

          {/* Layer 2 Image */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            variants={{
              initial: { opacity: 1 },
              hover: { opacity: 0 },
            }}
            transition={{
              type: "tween",
              ease: "easeOut",
              duration: 0.05,
            }}
          >
            <div
              className="absolute inset-0 bg-[url('/nav-bg.webp')] bg-cover bg-center"
              style={{ mixBlendMode: "luminosity" }}
            />
          </motion.div>
        </div>
      )}

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

      {/* SecondDecor */}
      {secondDecor && (
        <motion.div
          className="absolute z-10"
          variants={{
            initial: secondDecor.animation.initial,
            hover: secondDecor.animation.hover,
          }}
        >
          <Image
            src={secondDecor.decorImage}
            alt={secondDecor.decorImageAlt || ""}
            width={secondDecor.width}
            height={secondDecor.height}
            className="pointer-events-none"
          />
        </motion.div>
      )}
    </motion.div>
  );

  return <Link href={href}>{content}</Link>;
}
