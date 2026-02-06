"use client";

import { ComponentType } from "react";
import NavItem from "./NavItems";

export type NavigationTabItem = {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
};

type TabSize = "sm" | "base" | "lg";
type TabVariant = "default" | "pill" | "bordered" | "borderBottom" | "segmented";
type IconPosition = "left" | "right";

interface NavigationTabsProps {
  items: NavigationTabItem[];
  activeValue: string;
  onChange: (value: string) => void;
  size?: TabSize;
  variant?: TabVariant;
  iconPosition?: IconPosition;
  containerClassName?: string;
}

const CONTAINER_VARIANT_CLASSES: Record<
  TabVariant,
  {
    base: string;
    size: Record<TabSize, string>;
  }
> = {
  default: {
    base: "flex gap-3",
    size: {
      sm: "",
      base: "",
      lg: "",
    },
  },

  pill: {
    base: "flex gap-2 rounded-full",
    size: {
      sm: "",
      base: "",
      lg: "",
    },
  },

  bordered: {
    base: "inline-flex items-center bg-(--bg-brand-softer) border border-(--border-default) rounded-lg overflow-hidden",
    size: {
      sm: "h-12 p-2 gap-1",
      base: "h-16 p-3 gap-1.5",
      lg: "h-20 p-4 gap-2",
    },
  },

  borderBottom: {
    base: "flex border-b border-(--border-secondary)",
    size: {
      sm: "gap-4",
      base: "gap-6",
      lg: "gap-8",
    },
  },

  segmented: {
    base: "inline-flex items-center bg-(--bg-neutral-primary-soft) overflow-hidden",
    size: {
      sm: "w-[280px] h-[48px] gap-2 p-1.5 rounded-[14px]",
      base: "w-[341px] h-[56px] gap-3 p-2 rounded-[16px]",
      lg: "w-[400px] h-[64px] gap-4 p-2.5 rounded-[18px]",
    },
  },
};

export default function NavigationTabs({
  items,
  activeValue,
  onChange,
  size = "base",
  variant = "default",
  iconPosition = "left",
  containerClassName,
}: NavigationTabsProps) {
  const variantClasses = CONTAINER_VARIANT_CLASSES[variant];
  const containerClasses = `${variantClasses.base} ${variantClasses.size[size]}`;

  return (
    <nav className={`${containerClasses} ${containerClassName ?? ""} w-full`}>
      {items.map((item) => (
        <NavItem
          key={item.value}
          label={item.label}
          value={item.value}
          icon={item.icon}
          isActive={item.value === activeValue}
          onClick={() => onChange(item.value)}
          size={size}
          variant={variant}
          iconPosition={iconPosition}
          className="w-full"
        />
      ))}
    </nav>
  );
}