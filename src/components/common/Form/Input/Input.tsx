"use client";
import clsx from "clsx";
import { Close } from "flowbite-react-icons/outline";
import { InputHTMLAttributes } from "react";

type InputSize = "xs" | "sm" | "base" | "lg" | "xl";

type InputVariant =
  | "default"
  | "addOnIcon"
  | "addOnText"
  | "innerButton"
  | "stacked";

 interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;

  inputSize?: InputSize;
  variant?: InputVariant;

  /* content */
  leftIcon?: React.ReactNode;
  addOnIcon?: React.ReactNode;
  addOnText?: string;
  innerButton?: React.ReactNode;
  rightIcon?: React.ReactNode;

  /* styling */
  wrapperClassName?: string;
}

export default function Input({
  inputSize = "base",
  variant = "default",
  leftIcon,
  addOnIcon,
  addOnText,
  innerButton,
  className,
  wrapperClassName,
  value,
  rightIcon,
  onChange,
  onClear,
  ...props
}: InputProps) {
  const showClearButton = variant !== "innerButton" && !innerButton && !rightIcon;

  return (
    <div
      className={clsx(
        "input-wrapper",
        `input-${inputSize}`,
        `input-variant-${variant}`,
        wrapperClassName
      )}
    >
      {/* ADDON ICON */}
      {variant === "addOnIcon" && addOnIcon && (
        <span className="input-addon">{addOnIcon}</span>
      )}

      {/* ADDON TEXT */}
      {variant === "addOnText" && addOnText && (
        <span className="input-addon">{addOnText}</span>
      )}

      <div className="input-inner">
        {/* LEFT ICON */}
        {leftIcon && <span className="input-left-icon">{leftIcon}</span>}

        <input
          {...props}
          value={value}
          onChange={onChange}
          className={clsx(
            "input",
            { "has-left-icon": !!leftIcon },
            className
          )}
        />
      </div>

      {/* INNER BUTTON */}
      {variant === "innerButton" && innerButton && (
        <span className="input-addon">{innerButton}</span>
      )}
      
      {/* RIGHT ICON */}
      {rightIcon && (
        <span className="input-right-icon-btn top-1/2 -translate-y-1/2">{rightIcon}</span>
      )}

      {/* CLEAR BUTTON */}
      {showClearButton && (
        <button
          type="button"
          onClick={onClear}
          className="input-clear-btn absolute right-2 top-1/2 -translate-y-1/2 z-10"
          aria-label="Clear input"
        >
          <Close className="input-close-icon" />
        </button>
      )}
    </div>
  );
}
