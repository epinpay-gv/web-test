"use client";

import { ComponentType } from "react";

export type NavigationTabItem = {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
};

interface NavigationTabsProps {
  items: NavigationTabItem[];
  activeValue: string;
  onChange: (value: string) => void;

  /** stil kontrolü */
  containerClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;

  /** ikon */
  iconClassName?: string;
  iconPosition?: "left" | "right";
}

export default function NavigationTabs({
  items,
  activeValue,
  onChange,

  containerClassName,
  tabClassName,
  activeTabClassName,
  inactiveTabClassName,

  iconClassName,
  iconPosition = "left",
}: NavigationTabsProps) {
  return (
    <nav className={containerClassName}>
      {items.map((item) => {
        const isActive = item.value === activeValue;
        const Icon = item.icon;

        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`
              ${tabClassName ?? ""}
              ${isActive ? activeTabClassName ?? "" : inactiveTabClassName ?? ""}
            `}
          >
            {Icon && iconPosition === "left" && (
              <Icon className={iconClassName} />
            )}

            <span className="whitespace-nowrap">{item.label}</span>

            {Icon && iconPosition === "right" && (
              <Icon className={iconClassName} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
