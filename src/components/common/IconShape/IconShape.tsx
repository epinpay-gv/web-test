"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface IconShapeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "circle" | "square";
  label?: string;
  color?: "green" | "red" | "brand" | "yellow" | "gray" | "dark" | "white" | "custom";
  customColor?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  icon: React.ElementType;
}

const colorMap = {
  green: "bg-(--bg-success-soft) text-(--text-fg-success-strong)",
  red: "bg-(--bg-danger-soft) text-(--text-fg-danger-strong)",
  brand: "bg-(--bg-brand-softer) text-(--text-fg-brand)",
  yellow: "bg-(--bg-warning-soft) text-(--text-fg-warning)",
  gray: "bg-(--bg-neutral-tertiary) text-(--text-body)",
  dark: "bg-(--bg-dark) text-(--text-white)",
  white: "bg-(--bg-neutral-primary-medium) text-(--text-body) border border-(--border-default-medium)",
  custom: "",
};

const sizeMap = {
  xs: "w-4 h-4 p-1",
  sm: "w-6 h-6 p-1.5",
  md: "w-9 h-9 p-2.5",
  lg: "w-12 h-12 p-3.5",
  xl: "w-16 h-16 p-4",
  "2xl": "w-24 h-24 p-5",
};

export const IconShape = ({
  variant = "square",
  label,
  color = "green",
  customColor,
  size = "md",
  icon: Icon,
  className,
  onClick, // onClick'i buradan yakalıyoruz
  ...props // Diğer tüm div özelliklerini (onHover vb.) buraya topluyoruz
}: IconShapeProps) => {
  
  const isCustom = color === "custom" && customColor;
  
  const customStyle = isCustom 
    ? { 
        color: customColor,
        backgroundColor: `transparent`, // %10 şeffaflık için hex sonuna 1A ekledik
      } 
    : {};

  return (
    <div
      onClick={onClick}
      style={customStyle}
      {...props} // onClick dahil tüm özellikleri div'e geçirdik
      className={cn(
        "flex items-center justify-center transition-all shrink-0 select-none",
        onClick && "cursor-pointer hover:opacity-80 active:scale-90", 
        variant === "circle" ? "rounded-full" : "rounded-(--radius-base)",
        !isCustom && colorMap[color],
        sizeMap[size],
        className
      )}
    >
      <Icon className="w-full h-full" strokeWidth={2} />
    </div>
  );
};