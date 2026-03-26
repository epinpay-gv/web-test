"use client";
import { Packages } from "../../streamers.types";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import PackageCardCriterias from "./PackageCardCriterias";
import PackageCardDescription from "./PackageCardDescription";
import PackageCardInfo from "./PackageCardInfo";
import { useState } from "react";

interface PackageCardProps {
  data: Packages;
  isOpen: boolean;
  onClick: (id: string) => void;
}

export default function PackageCard({
  data,
  isOpen = false,
  onClick,
}: PackageCardProps) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      layout
      initial={false}
      onClick={() => onClick(data.id)}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={
        !isMobile
          ? {
              flexShrink: 0,
              flexGrow: isOpen ? 1 : 0,
              flexBasis: isOpen ? 600 : 180,
              transition:
                "flex-basis 0.4s ease-in-out, flex-grow 0.4s ease-in-out",
            }
          : undefined
      }
      animate={isMobile ? { height: isOpen ? "auto" : 120 } : undefined}
      className={`cursor-pointer overflow-hidden rounded-xl p-2 md:p-4 flex flex-col md:flex-row gap-4
        ${isOpen ? "bg-(--bg-brand-soft)" : "bg-(--bg-neutral-primary) md:max-w-25"}`}
    >
      <motion.div layout="position">
        <PackageCardInfo data={data} />
      </motion.div>
      <div
        className={`flex flex-col md:flex-row gap-4 ${isOpen ? "" : "pointer-events-none"}`}
      >
        <PackageCardCriterias data={data} isOpen={isOpen} />
        <PackageCardDescription data={data} isOpen={isOpen} />
      </div>
    </motion.div>
  );
}
