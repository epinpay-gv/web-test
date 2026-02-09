"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

type ToggleSize = "base" | "lg";

interface ToggleProps extends React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
> {
  size?: ToggleSize;
  label?: string;
}

const sizeStyles = {
  base: {
    root: "h-5 w-9 border",
    thumb: "h-4 w-4 translate-x-0.5",
    thumbChecked: "data-[state=checked]:translate-x-[16px]",
  },
  lg: {
    root: "h-6 w-11 border",
    thumb: "h-5 w-5 translate-x-0.5",
    thumbChecked: "data-[state=checked]:translate-x-[18px]",
  },
};

const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  ToggleProps
>(({ className, size = "base", label, ...props }, ref) => {
  const reactId = React.useId();
  const s = sizeStyles[size];

  return (
    <div className="flex items-center gap-2">
      <SwitchPrimitives.Root
        ref={ref}
        id={reactId}
        className={cn(
          "relative inline-flex items-center rounded-full cursor-pointer transition-colors",

          // size
          s.root,

          // states
          "data-[state=checked]:bg-(--bg-brand) data-[state=checked]:border-(--border-brand-light)",
          "data-[state=unchecked]:bg-(--bg-neutral-tertiary-medium) data-[state=unchecked]:border-(--border-default-strong)",

          // focus
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-(--bg-white)",

          // disabled
          "disabled:cursor-not-allowed disabled:opacity-60",
          "data-disabled:bg-(--bg-neutral-tertiary-medium) data-disabled:border-(--border-light-medium)",
          "disabled:data-[state=checked]:bg-(--bg-neutral-tertiary-medium) disabled:data-[state=checked]:border-(--border-light-medium)",
          "data-disabled:[&>span]:bg-(--bg-neutral-secondary-soft)",

          className,
        )}
        {...props}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none rounded-full bg-(--bg-white) shadow-lg",
            "transition-transform duration-500 ease-out",
            s.thumb,
            s.thumbChecked,
          )}
        />
      </SwitchPrimitives.Root>
      <label htmlFor={reactId} className="text-sm cursor-pointer">
        {label}
      </label>
    </div>
  );
});

Toggle.displayName = "Toggle";
export { Toggle };
