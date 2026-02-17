"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AngleDown, AngleRight } from "flowbite-react-icons/outline";

interface ExpandableContentProps {
  children: React.ReactNode;
  maxHeight?: number; // px
  className?: string;
}

export default function ExpandableContent({
  children,
  maxHeight = 240,
  className,
}: ExpandableContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    setIsOverflowing(el.scrollHeight > maxHeight);
  }, [maxHeight, children]);

  return (
    <div className="relative">
      <div
        ref={contentRef}
        style={{
          maxHeight: isExpanded ? "none" : `${maxHeight}px`,
        }}
        className={cn("overflow-hidden transition-all duration-300", className)}
      >
        {children}
      </div>

      {isOverflowing && !isExpanded && (
        <>
          <button
            onClick={() => setIsExpanded(true)}
            className="flex gap-2 items-center mt-4 text-(--text-font-base) hover:text-(--text-brand-strong) cursor-pointer"
          >
            Devamını gör <AngleDown size={16} />
          </button>
        </>
      )}

      {isExpanded && (
        <button
          onClick={() => setIsExpanded(false)}
          className="mt-4 text-(--text-font-base) font-medium hover:text-(--text-brand-strong) cursor-pointer"
        >
          Daha az göster
        </button>
      )}
    </div>
  );
}
