import { InputHTMLAttributes, ReactNode } from "react";

export type InputSize = "xs" | "sm" | "base" | "lg" | "xl";

export type InputVariant =
  | "default"
  | "addOnIcon"
  | "addOnText"
  | "innerButton"
  | "stacked";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;

  inputSize?: InputSize;
  variant?: InputVariant;

  /* content */
  leftIcon?: ReactNode;
  addOnIcon?: ReactNode;
  addOnText?: string;
  innerButton?: ReactNode;
  rightIcon?: ReactNode;

  /* styling */
  wrapperClassName?: string;
}
