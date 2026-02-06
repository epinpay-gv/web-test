"use client";
import { Close, Clock } from "flowbite-react-icons/outline";
import { ReactNode, useState } from "react";

type BadgeSize = "sm" | "lg";
type BadgeTheme = "gray" | "brand" | "success" | "danger" | "warning" | "dark";
type BadgeType = "default" | "pill";

interface BadgeProps {
  text: string;
  secondaryText?: string;
  number?: string | number;
  theme?: BadgeTheme;
  size?: BadgeSize;
  type?: BadgeType;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  showSecondaryText?: boolean;
  showCloseOnHover?: boolean;
  onClose?: () => void;
  className?: string;
}

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5 gap-1",
  lg: "text-sm px-3 py-1 gap-1.5",
};

const ICON_SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "w-[10px] h-[10px]",
  lg: "w-[11.67px] h-[11.67]",
};

const THEME_CLASSES: Record<BadgeTheme, string> = {
  gray: "bg-gray-100 text-gray-800 border-gray-300",
  brand: "bg-blue-100 text-blue-800 border-blue-300",
  success: "bg-green-100 text-green-800 border-green-300",
  danger: "bg-red-100 text-red-800 border-red-300",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
  dark: "bg-gray-800 text-white border-gray-700",
};

const TYPE_CLASSES: Record<BadgeType, string> = {
  default: "rounded",
  pill: "rounded-full",
};

export function Badges({
  text,
  secondaryText,
  number,
  theme = "gray",
  size = "sm",
  type = "default",
  leftIcon,
  rightIcon,
  showLeftIcon = false,
  showRightIcon = false,
  showSecondaryText = false,
  showCloseOnHover = false,
  onClose,
  className,
}: BadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const iconSizeClass = ICON_SIZE_CLASSES[size];

  return (
    <span
      className={`
        inline-flex items-center font-medium border
        ${SIZE_CLASSES[size]}
        ${THEME_CLASSES[theme]}
        ${TYPE_CLASSES[type]}
        ${showCloseOnHover ? "cursor-pointer" : ""}
        ${className ?? ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    
  

  
    </span>
  );
}
