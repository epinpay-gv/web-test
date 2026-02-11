"use client";

import { ReactNode } from "react";

type DropdownItemSize = "sm" | "md";
type DropdownItemState = "initial" | "hover" | "active" | "disabled";

interface DropdownListItemProps {
  text: string;
  secondaryText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  checkbox?: boolean;
  checked?: boolean;
  flagImage?: string;
  size?: DropdownItemSize;
  state?: DropdownItemState;
  className?: string;
  onClick?: () => void;
  onCheckboxChange?: (checked: boolean) => void;
}

const BASE_CLASS =
  "flex items-center justify-between w-full rounded-md transition-colors font-semibold";

const SIZE_CLASSES: Record<DropdownItemSize, string> = {
  sm: "px-2 py-1.5 text-sm gap-2",
  md: "px-3 py-2 text-sm gap-3",
};

const STATE_CLASSES: Record<DropdownItemState, string> = {
  initial: "hover:bg-(--bg-neutral-tertiary-medium) text-(--text-body)",
  hover: "bg-(--bg-neutral-tertiary-medium) text-(--text-heading)",
  active: "bg-(--bg-neutral-secondary) text-(--text-heading)",
  disabled: "opacity-50 pointer-events-none text-(--text-muted)",
};

export default function DropdownListItem({
  text,
  secondaryText,
  leftIcon,
  rightIcon,
  showLeftIcon = false,
  showRightIcon = false,
  checkbox = false,
  checked = false,
  flagImage,
  size = "md",
  state = "initial",
  className,
  onClick,
  onCheckboxChange,
}: DropdownListItemProps) {
  const handleClick = () => {
    if (state === "disabled") return;

    if (checkbox && onCheckboxChange) {
      onCheckboxChange(!checked);
    }
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={state === "disabled"}
      className={`
        ${BASE_CLASS}
        ${SIZE_CLASSES[size]}
        ${STATE_CLASSES[state]}
        ${className ?? ""}
      `}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        {checkbox && (
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              e.stopPropagation();
              onCheckboxChange?.(e.target.checked);
            }}
            className="w-4 h-4 shrink-0"
            disabled={state === "disabled"}
          />
        )}

        {/* Flag Image */}
        {flagImage && (
          <img
            src={flagImage}
            alt=""
            className="w-[12.5px] h-[13.33px] rounded-full object-cover shrink-0"
          />
        )}

        {/* Left Icon */}
        {showLeftIcon && leftIcon && (
          <span className="flex items-center justify-center w-3 h-[10.67px] shrink-0">
            {leftIcon}
          </span>
        )}

        {/* Text Content */}
        <div className="flex flex-row items-start gap-8">
          <span>{text}</span>
          {secondaryText && (
            <span className="text-sm font-normal">
              {secondaryText}
            </span>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {showRightIcon && rightIcon && (
          <span className="flex items-center justify-center w-3.5 h-3.5 shrink-0">
            {rightIcon}
          </span>
        )}
      </div>
    </button>
  );
}