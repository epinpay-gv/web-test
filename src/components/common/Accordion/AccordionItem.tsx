"use client";

import { useState } from "react";
import { AngleRight } from "flowbite-react-icons/outline";
import { ReactNode } from "react";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  leftIcon?: ReactNode;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
}

const BASE_ITEM_CLASS = "border-b border-(--border-default) ";
const TRIGGER_CLASS =
  "w-full flex items-center justify-between gap-4 py-4 text-left text-(--text-body) hover:text-(--text-brand-strong) transition-colors";
const CONTENT_CLASS =
  "text-(--text-body) text-sm leading-relaxed overflow-hidden transition-all duration-300";
const ICON_CLASS = "w-5 h-5 shrink-0 transition-transform duration-300";

export default function AccordionItem({
  title,
  children,
  defaultOpen = false,
  leftIcon,
  showLeftIcon = true,
  showRightIcon = true,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`${BASE_ITEM_CLASS} `}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`cursor-pointer ${TRIGGER_CLASS} ${
          isOpen ? "text-(--text-brand-strong)" : ""
        }`}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3 font-medium">
          {showLeftIcon && leftIcon && <span>{leftIcon}</span>}
          {title}
        </span>

        {showRightIcon && (
          <AngleRight
            size={20}
            className={`${ICON_CLASS} ${isOpen ? "rotate-90" : ""}`}
          />
        )}
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-4"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className={CONTENT_CLASS}>{children}</div>
      </div>
    </div>
  );
}
