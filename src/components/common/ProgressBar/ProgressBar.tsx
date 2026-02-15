"use client";

import React from "react";
import clsx from "clsx";

interface ProgressBarProps {
  progress: number; 
  variant?: "brand" | "success" | "danger" | "warning" | "dark" | "gray" | "dynamic";
  labelPosition?: "top" |"side" | "bottom"
  showLabels?: boolean;
  className?: string;
  size?: "sm" | "base" | "lg";
}

export function ProgressBar({
  progress = 0,
  variant = "brand",
  showLabels = true,
  labelPosition = "top",
  className,
  size = "base",
}: ProgressBarProps) {

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  const getDynamicColor = (value: number) => {
    if (value < 25) return "bg-(--bg-danger)";
    if (value < 50) return "bg-(--bg-warning)";
    if (value < 75) return "bg-(--bg-brand)";
    return "bg-(--bg-success)";
  };

  const variantStyles = {
    brand: "bg-(--bg-brand)",
    success: "bg-(--bg-success)",
    danger: "bg-(--bg-danger)",
    warning: "bg-(--bg-warning)",
    dark: "bg-(--bg-dark)",
    gray: "bg-(--bg-gray)",
    dynamic: getDynamicColor(clampedProgress),
  };

  const sizeStyles = {
    sm: "h-1",
    base: "h-1.5",
    lg: "h-2.5",
  };

  return (
    <div className={clsx("w-full flex  gap-1.5", labelPosition != "side" ? "flex-col" : "flex-row", className)}>
      {showLabels && labelPosition === "top" && (
        <div className="flex justify-between items-center px-0.5">
          <span className="font-base text-xs text-(--text-body)">0%</span>
          <span className="font-base text-xs text-(--text-body)">100%</span>
        </div>
      )}
      <div className="flex w-full gap-1 items-center justify-between">
        {showLabels && labelPosition === "side" && (
            <div className="flex justify-between items-center px-0.5">
                <span className="font-base text-xs text-(--text-body)">0%</span>  
            </div>
        )}
        <div className={clsx(
          "w-full bg-(--bg-neutral-quaternary) rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/30",
          sizeStyles[size]
        )}
        >
        <div className={clsx( 
                "h-full rounded-full ",
                variantStyles[variant]
            )}
            style={{ width: `${clampedProgress}%` }}
            />
        </div>
        {showLabels && labelPosition === "side" && (
          <span className="font-base text-xs text-(--text-body)">100%</span>  
        )}
      </div>
      {showLabels && labelPosition === "bottom" && (
        <div className="flex justify-between items-center px-0.5">
          <span className="font-base text-xs text-(--text-body)">0%</span>
          <span className="font-base text-xs text-(--text-body)">100%</span>
        </div>
      )}
    </div>
  );
}
