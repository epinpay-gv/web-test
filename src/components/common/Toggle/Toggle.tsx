"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

type ToggleSize = "base" | "lg"

interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  size?: ToggleSize
}

const sizeStyles = {
  base: {
    root: "h-10 w-20 border-2",
    thumb: "h-6 w-6 translate-x-1",
    thumbChecked: "data-[state=checked]:translate-x-[48px]",
  },
  lg: {
    root: "h-14 w-28 border-4",
    thumb: "h-10 w-10 translate-x-1",
    thumbChecked: "data-[state=checked]:translate-x-[60px]",
  },
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  ToggleProps
>(({ className, size = "base", ...props }, ref) => {
  const s = sizeStyles[size]

  return (
    <SwitchPrimitives.Root
      ref={ref}
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

        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none rounded-full bg-(--bg-white) shadow-lg",
          "transition-transform duration-500 ease-out",
          s.thumb,
          s.thumbChecked
        )}
      />
    </SwitchPrimitives.Root>
  )
})

Toggle.displayName = "Toggle"
export { Toggle }
