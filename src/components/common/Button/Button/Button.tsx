"use client";

import { ArrowRight, ArrowLeft } from "flowbite-react-icons/outline";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonTextSize = "xs" | "sm" | "base" | "lg" | "xl";

type ButtonArrow = {
  left?: boolean;
  right?: boolean;
};


type ButtonPadding = "rounded" | "xs" | "sm" | "base" | "lg" | "xl";

type ButtonVariant = "brand" | "secondary" | "tertiatry" | "success" | "danger" | "warning" | "dark" | "ghost";
type ButtonAppearance = "filled" | "outline" ;
type ButtonSize = "xs" | "sm" | "base" | "lg" | "xl" | "full"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: ReactNode;
  size?: ButtonSize;
  textSize?: ButtonTextSize;
  arrows?: ButtonArrow;
  padding?: ButtonPadding;
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  arrowSize?: string;
}

const TEXT_SIZE_CLASSES: Record<ButtonTextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const BUTTON_PADDING: Record<ButtonPadding, string> = {
  rounded: "",
  xs: "py-1.5 px-3",
  sm: "py-2 px-3",
  base: "py-2.5 px-4",
  lg: "py-3 px-5",
  xl: "py-3.5 px-6",
};

const BUTTON_SIZE: Record<ButtonSize, string> = {
  full: "w-full",
  xs: "w-8 h-8",
  sm: "w-9 h-9",
  base: "w-10 h-10",
  lg: "w-11 h-11",
  xl: "w-12 h-12",

}

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

export default function Button({
  text,
  icon,
  textSize = "base",
  arrows,
  padding = "base",
  variant = "brand",
  appearance = "filled",
  className,
  size = "full",
  arrowSize = "16",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        btn
        ${BUTTON_SIZE[size]}
        ${VARIANT_CLASSES[variant][appearance]}
        ${TEXT_SIZE_CLASSES[textSize]}
        ${BUTTON_PADDING[padding]}
        ${className ?? ""}
      `}
    >
      {arrows?.left && <ArrowLeft size={arrowSize}/>}
      {text && <span>{text}</span>}
      {icon}
      {arrows?.right && <ArrowRight size={arrowSize}/>}
    </button>
  );
}
