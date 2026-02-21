"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import DropdownListItem from "./DropdownListItem";
import { DropdownMenuItem } from "./dropdown.types";
interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: "left" | "right";
  width?: number | string;
  onSelect?: (item: DropdownMenuItem) => void;
  closeOnSelect?: boolean;
  className?: string;
}

export default function DropdownMenu({
  trigger,
  items,
  align = "left",
  width = 240,
  onSelect,
  closeOnSelect = true,
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  // Outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // ESC close
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    if (open) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <div onClick={toggle} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          style={{ width }}
          className={clsx(
            "absolute z-20 mt-2 rounded-md shadow-lg border border-(--border-default-medium)",
            "bg-(--bg-neutral-primary-medium) p-2",
            align === "right" ? "right-0" : "left-0",
            className,
          )}
        >
          <div className="flex flex-col gap-1.5">
            {items.map((item) => (
              <DropdownListItem
                key={item.id}
                text={item.text}
                secondaryText={item.secondaryText}
                leftIcon={item.leftIcon}
                rightIcon={item.rightIcon}
                checkbox={item.checkbox}
                checked={item.checked}
                state={item.disabled ? "disabled" : "initial"}
                onClick={() => {
                  if (item.disabled) return;

                  onSelect?.(item);
                  if (closeOnSelect && !item.checkbox) close();
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
