"use client";

import { ComponentType } from "react";

type NavItemSize = "sm" | "base" | "lg";
type NavItemVariant = "default" | "pill" | "borderBottom" | "bordered" | "segmented";
type IconPosition = "left" | "right";

interface NavItemProps {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
  isActive: boolean;
  onClick: () => void;
  size?: NavItemSize;
  variant?: NavItemVariant;
  iconPosition?: IconPosition;
  className?: string;
}

const ITEM_SIZE_CLASSES: Record<
  NavItemSize,
  {
    gap: string;
    iconSize: string;
  }
> = {
  sm: {
    gap: "gap-1",
    iconSize: "w-3.5 h-3.5",
  },
  base: {
    gap: "gap-1.5",
    iconSize: "w-4 h-4",
  },
  lg: {
    gap: "gap-2",
    iconSize: "w-5 h-5",
  },
};

const ITEM_VARIANT_CLASSES: Record<
  NavItemVariant,
  {
    container: Record<NavItemSize, string>;
    base: string;
    active: string;
    inactive: string;
  }
> = {
  default: {
    container: {
      sm: "h-4 rounded",
      base: "h-5 rounded-md",
      lg: "h-6 rounded-lg",
    },
    base: "flex items-center whitespace-nowrap transition-colors",
    active: "text-(--text-fg-brand-strong)",
    inactive: "text-(--text-body) hover:text-(--text-fg-brand-strong)",
  },

  pill: {
    container: {
      sm: "h-8 rounded-full px-3 py-1.5",
      base: "h-12 rounded-full px-4 py-2.5",
      lg: "h-12 rounded-full px-5 py-3",
    },
    base: "w-full flex items-center whitespace-nowrap transition-colors",
    active: "bg-(--bg-brand) text-(--text-black)",
    inactive:
      "bg-(--bg-secondary) text-(--text-body) hover:bg-(--bg-brand) hover:text-(--text-black)",
  },

  borderBottom: {
    container: {
      sm: "pb-1.5",
      base: "pb-2",
      lg: "pb-2.5",
    },
    base: "flex items-center whitespace-nowrap border-b-2",
    active: "border-(--border-brand) text-(--text-fg-brand)",
    inactive:
      "border-transparent text-(--text-body) hover:border-(--border-brand) hover:text-(--text-fg-brand-strong)",
  },

  bordered: {
    container: {
      sm: "h-10 rounded-md px-3 py-2",
      base: "h-10 rounded-md px-4 py-2.5",
      lg: "h-12 rounded-lg px-5 py-3",
    },
    base: "flex items-center whitespace-nowrap transition-colors ",
    active: "bg-(--bg-neutral-primary-soft) text-(--text-fg-on-brand)",
    inactive: "text-(--text-body) hover:bg-(--bg-neutral-primary-soft) ",
  },

  segmented: {
    container: {
      sm: "w-[88px] h-[36px] rounded-[10px]",
      base: "w-[113px] h-[40px] rounded-[12px]",
      lg: "w-[128px] h-[48px] rounded-[14px]",
    },
    base: "flex items-center justify-center whitespace-nowrap transition-colors text-xs",
    active: "bg-(--bg-brand) text-(--text-black)",
    inactive: "text-(--text-body) hover:bg-(--bg-brand-softer)",
  },
};

export default function NavItem({
  label,
  value,
  icon: Icon,
  isActive,
  onClick,
  size = "base",
  variant = "default",
  iconPosition = "left",
  className,
}: NavItemProps) {
  const variantClasses = ITEM_VARIANT_CLASSES[variant];
  const sizeClasses = ITEM_SIZE_CLASSES[size];
  const containerSize = variantClasses.container[size];

  return (
    <button
      onClick={onClick}
      className={`
        ${variantClasses.base}
        ${containerSize}
        ${sizeClasses.gap}
        ${isActive ? variantClasses.active : variantClasses.inactive}
        ${className ?? ""}
      `}
    >
      {Icon && iconPosition === "left" && (
        <Icon className={sizeClasses.iconSize} />
      )}

      <span>{label}</span>

      {Icon && iconPosition === "right" && (
        <Icon className={sizeClasses.iconSize} />
      )}
    </button>
  );
}