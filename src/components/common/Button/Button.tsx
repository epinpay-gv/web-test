"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonColor =
  | "primary"
  | "secondary"
  | "brand"
  | "danger"
  | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: ButtonColor;
}

const COLOR_CLASSES: Record<ButtonColor, string> = {
    primary:
        "bg-(--bg-neutral-primary-medium) text-(--text-body) border-(--border-default-medium) hover:opacity-90",
    secondary:
        "bg-[var(--bg-neutral-secondary)] text-(--text-body) border-(--border-default-medium) hover:opacity-90",
    brand: 
        "bg-(--bg-brand-strong) text-(--text-black) hover:opacity-90",
    danger:
        "bg-red-600 text-white hover:bg-red-700",
    ghost:
        "bg-transparent text-[var(--bg-neutral-primary-medium)] hover:bg-muted",
};

export function Button({
  text,
  color = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        border
        inline-flex items-center justify-center
        px-4 py-2 text-sm font-medium
        transition-colors
        rounded-(--radius-base)
        ${COLOR_CLASSES[color]}
        ${className ?? ""}
      `}
    >
      {text}
    </button>
  );
}
