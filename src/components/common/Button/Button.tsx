"use client";

import { ArrowRight, ArrowLeft } from "flowbite-react-icons/outline";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonTextSize = "xs" | "sm" | "base" | "lg" | "xl";

type ButtonArrow = {
  left?: boolean;
  right?: boolean;
};

type ButtonPadding = "xs" | "sm" | "base" | "lg" | "xl";

type ButtonVariant = "brand" | "secondary" | "tertiatry" | "success" | "danger" | "warning" | "dark" | "ghost";
type ButtonAppearance = "filled" | "outline" ;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: ReactNode;
  textSize?: ButtonTextSize;
  arrows?: ButtonArrow;
  padding?: ButtonPadding;
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
}

const TEXT_SIZE_CLASSES: Record<ButtonTextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const BUTTON_PADDING: Record<ButtonPadding, string> = {
  xs: "py-1.5 px-3",
  sm: "py-2 px-3",
  base: "py-2.5 px-4",
  lg: "py-3 px-5",
  xl: "py-3.5 px-6",
};

const VARIANT_CLASSES: Record<
  ButtonVariant,
  Record<ButtonAppearance, string>
> = {
  brand: {
    filled: "btn-brand-filled",
    outline: "btn-brand-outline",
  },
  secondary: {
    filled: "btn-secondary-filled",
    outline: "btn-secondary-outline",
  },
  tertiatry: {
    filled: "btn-tertiatry-filled",
    outline: "btn-tertiatry-outline"
  },
  success: {
    filled: "btn-success-filled",
    outline: "btn-success-outline"
  },
  danger: {
    filled: "btn-danger-filled",
    outline: "btn-danger-outline"
  },
  warning: {
    filled: "btn-warning-filled",
    outline: "btn-warning-outline"
  },
  dark: {
    filled: "btn-dark-filled",
    outline: "btn-dark-outline"
  },
  ghost: {
    filled: "btn-ghost-filled",
    outline: "btn-ghost-outline"
  }
};

export function Button({
  text,
  icon,
  textSize = "base",
  arrows,
  padding = "base",
  variant = "brand",
  appearance = "filled",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        btn
        ${VARIANT_CLASSES[variant][appearance]}
        ${TEXT_SIZE_CLASSES[textSize]}
        ${BUTTON_PADDING[padding]}
        ${className ?? ""}
      `}
    >
      {arrows?.left && <ArrowLeft />}
      {text && <span>{text}</span>}
      {icon}
      {arrows?.right && <ArrowRight />}
    </button>
  );
}
