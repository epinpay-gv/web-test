"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  variant?: "square" | "circle";
  label?: string;
  helperText?: string;
  secondaryText?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      variant = "square",
      label,
      helperText,
      secondaryText,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId();
    const finalId = id ?? reactId;

    return (
      <div className={cn("flex items-start gap-3", disabled && "opacity-50")}>
        <div className="relative flex items-center justify-center h-6 w-6">
          <CheckboxPrimitive.Root
            ref={ref}
            id={finalId}
            disabled={disabled}
            className={cn(
              "shrink-0 transition-all duration-200",
              "focus:outline-none",

              // FOCUS (white ring)
              "focus:ring-2 focus:ring-white focus:ring-offset-0",
              "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-0",

              // BASE
              "border-2 h-5 w-5",

              // DEFAULT TEXT COLOR (indicator uses currentColor)
              "text-(--bg-brand)",

              // DISABLED TEXT COLOR
              "disabled:text-(--bg-neutral-quaternary)",

              // SQUARE
              variant === "square" && [
                "!rounded-[4px]",
                "bg-(--bg-neutral-secondary-strong)",
                "border-(--border-default-strong)",
                "data-[state=checked]:bg-(--bg-brand)",
                "data-[state=checked]:border-(--border-brand)",
                "data-[state=checked]:text-(--text-black)",

                // disabled + checked
                "disabled:data-[state=checked]:bg-(--bg-neutral-secondary-strong)",
                "disabled:data-[state=checked]:border-(--border-default-strong)",
                "disabled:data-[state=checked]:text-(--text-fg-disabled)",
              ],

              // CIRCLE
              variant === "circle" && [
                "rounded-full",
                "bg-(--bg-neutral-secondary-strong)",
                "border-(--border-default-strong)",
                "p-0.75",

                "data-[state=checked]:border-(--border-brand)",

                // disabled + checked
                "disabled:data-[state=checked]:border-(--border-default-strong)",
              ],

              "disabled:cursor-not-allowed",
              className,
            )}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
              {variant === "square" ? (
                <Check className="h-3.5 w-3.5 stroke-[4px]" />
              ) : (
                <div className="h-2.5 w-2.5 rounded-full bg-current" />
              )}
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
        </div>

        {(label || helperText) && (
          <div className="grid gap-1 pt-0.5 leading-none select-none">
              {label && (
                <label
                  htmlFor={finalId}
                  className="text-sm font-medium text-slate-200 cursor-pointer"
                >
                  {label} {secondaryText && (
                <span className="text-sm text-body">{secondaryText}</span>
              )}
                </label>
              )}
              
            {helperText && (
              <p className="text-xs text-slate-500 font-normal">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
export { Checkbox };
