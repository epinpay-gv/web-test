"use client";
import { ReactNode } from "react";

type AccordionStyle = "default";

interface AccordionItemProps {
  index?: number;  
  isOpen?: boolean;  
  onToggle?: (index: number) => void;  
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  style?: AccordionStyle;
  className?: string;
}

const BASE_ITEM_CLASS = "border-b border-(--border-default)";
const TRIGGER_CLASS =
  "w-full flex items-center justify-between gap-4 py-4 text-left text-(--text-body) hover:text-(--text-brand-strong) transition-colors";
const CONTENT_CLASS = "pb-4 text-(--text-body) text-sm leading-relaxed";
const ICON_CLASS = "w-5 h-5 shrink-0 transition-transform duration-200";

export default function AccordionItem({
index = 0,  
  isOpen = false,  
  onToggle = () => {},  
  title,
  children,
  leftIcon,
  rightIcon,
  showLeftIcon = true,
  showRightIcon = true,
  className,
}: AccordionItemProps) {
  return (
    <div className={`${BASE_ITEM_CLASS} ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => onToggle(index)}
        className={`${TRIGGER_CLASS} ${isOpen ? "text-(--text-brand-strong)" : ""}`}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3 font-medium">
          {showLeftIcon && leftIcon && <span>{leftIcon}</span>}
          {title}
        </span>

        {showRightIcon && rightIcon && (
          <span className={`${ICON_CLASS} ${isOpen ? "rotate-180" : ""}`}>
            {rightIcon}
          </span>
        )}
      </button>

      {isOpen && <div className={CONTENT_CLASS}>{children}</div>}
    </div>
  );
}
