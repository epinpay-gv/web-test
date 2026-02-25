"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom"; // Portal için eklendi
import clsx from "clsx";
import DropdownListItem from "./DropdownListItem";
import { DropdownMenuItem } from "./dropdown.types";
import { BottomSheet } from "../BottomSheet/BottomSheet";

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  title?: string;
  align?: "left" | "right";
  width?: number | string;
  onSelect?: (item: DropdownMenuItem) => void;
  closeOnSelect?: boolean;
  className?: string;
}

export default function DropdownMenu({
  trigger,
  items,
  title = "Seçim Yapın",
  align = "left",
  width = 240,
  onSelect,
  closeOnSelect = true,
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 }); // Konum için eklendi
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggle = () => {
    if (!open && wrapperRef.current) {
      // Tetikleyici elementin ekrandaki tam konumunu hesapla
      const rect = wrapperRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: align === "right" ? rect.right + window.scrollX : rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setOpen((prev) => !prev);
  };

  const close = () => setOpen(false);

  const handleSelect = (item: DropdownMenuItem) => {
    if (item.disabled) return;
    onSelect?.(item);
    if (closeOnSelect && !item.checkbox) close();
  };

  useEffect(() => {
    if (!open || isMobile) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, isMobile]);

  return (
    <div ref={wrapperRef} className="relative inline-block w-full">
      <div onClick={toggle} className="cursor-pointer">
        {trigger}
      </div>

      {/* MASAÜSTÜ GÖRÜNÜM (Portal ile Body'ye Işınlama) */}
      {open && !isMobile && createPortal(
        <div
          style={{ 
            width: width === "100%" ? coords.width : width,
            position: 'absolute',
            top: `${coords.top}px`,
            left: align === "right" ? 'auto' : `${coords.left}px`,
            right: align === "right" ? `${window.innerWidth - coords.left}px` : 'auto',
          }}
          className={clsx(
            "z-[9999] mt-2 rounded-md shadow-2xl border border-(--border-default-medium)",
            "bg-(--bg-neutral-primary-medium) p-2 animate-in fade-in zoom-in-95 duration-200",
            className
          )}
        >
          <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto custom-scrollbar">
            {items.map((item) => (
              <DropdownListItem 
                key={item.id} 
                {...item} 
                state={item.disabled ? "disabled" : "initial"}
                onClick={() => handleSelect(item)} 
              />
            ))}
          </div>
        </div>,
        document.body // İçeriği buraya gönderiyoruz
      )}

      {/* MOBİL GÖRÜNÜM (BOTTOM SHEET) */}
      <BottomSheet isOpen={open && isMobile} onClose={close} title={title}>
        <div className="flex flex-col p-4 gap-2">
          {items.map((item) => (
            <div key={item.id} className="border-b border-gray-800 last:border-none py-1">
              <DropdownListItem 
                key={item.id} 
                {...item} 
                size="md"
                state={item.disabled ? "disabled" : "initial"}
                onClick={() => handleSelect(item)} 
              />
            </div>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}