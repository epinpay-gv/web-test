"use client";
import { Close } from "flowbite-react-icons/outline";
import { ReactNode } from "react";

type BadgeSize = "sm" | "lg";
type BadgeTheme = "gray" | "white" | "brand" | "danger" | "warning" | "success";
type BadgeType = "default" | "pill";

interface BadgeProps {
  text?: string;
  secondaryText?: string;
  icon?: ReactNode;
  size?: BadgeSize;
  theme?: BadgeTheme;
  type?: BadgeType;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

const BASE_BADGE_CLASS = "inline-flex items-center font-medium";

const BADGE_SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-1 gap-1",
  lg: "text-sm px-3 py-1.5 gap-2",
};

const BADGE_ICON_SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "w-3 h-3",
  lg: "w-4 h-4",
}

const BADGE_THEME_CLASSES: Record<BadgeTheme, string> = {
  gray: "bg-(--bg-neutral-secondary) border-(--border-default-medium) text-(--text-heading)",
  white:
    "bg-(--bg-neutral-primary-soft) border-(--border-default) text-(--text-heading)",
  brand:
    "bg-(--bg-brand-softer) border-(--border-brand-subtle) text-(--text-brand-strong)",
  danger:
    "bg-(--bg-danger-soft) border-(--border-danger-subtle) text-(--text-fg-danger-strong)",
  warning:
    "bg-(--bg-warning-soft) border-(--border-warning-subtle) text-(--text-fg-warning)",
  success:
    "bg-(--bg-success-strong) border-(--border-success-subtle) text-(--text-fg-success)",
};

const BADGE_TYPE_CLASSES: Record<BadgeType, string> = {
  default: "rounded-sm",
  pill: "rounded-full",
};

export default function Badge({
  text,
  secondaryText,
  icon,
  size = "sm",
  theme = "gray",
  type = "default",
  closable = false,
  onClose,
  className,
}: BadgeProps) {
  return (
    <span
      className={`
    ${BASE_BADGE_CLASS}
    ${BADGE_SIZE_CLASSES[size]}
    ${BADGE_THEME_CLASSES[theme]}
    ${BADGE_TYPE_CLASSES[type]}
    ${className ?? ""}
    `}
    >
      {icon && (
        <span
          className={`
      inline-flex items-center justify-center shrink-0
      ${BADGE_ICON_SIZE_CLASSES[size]}
    `}
        >
          {icon}
        </span>
      )}
      
       {text && <span className="leading-none">{text}</span>}
      {secondaryText && (
        <>
          <span className="opacity-50">|</span>
          <span className="leading-none opacity-75">{secondaryText}</span>
        </>
      )}
      {closable && (
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center hover:opacity-75"
        >
          <Close className={BADGE_ICON_SIZE_CLASSES[size]} />
        </button>
      )}
    </span>
  );
}
