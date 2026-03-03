"use client";

import React, { useEffect } from "react";
import { Close, AngleLeft } from "flowbite-react-icons/outline";
import { Button } from "../Button";
import { IconShape } from "../IconShape/IconShape";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  isOpen: boolean;
  onClose?: () => void;
  onBack?: () => void;
  title?: string;
  children: React.ReactNode;
  theme?: Theme
}
type Theme = "default" | "dark";

const THEME: Record<Theme, string> = {
  default: `bg-(--bg-neutral-primary-soft)`,
  dark: `bg-(--bg-variants-gray)`,
};


export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  onBack,
  title,
  children,
  theme="default"
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-60 " onClick={onClose} />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-70 flex flex-col animate-slide-up ">
        <div className={`rounded-t-(--raidus-base) max-h-[85vh] w-full flex flex-col border-t border-(--border-default) ${THEME[theme]}`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700/40">
            {/* Geri Butonu Alanı */}
            {onBack && (
              <div className="w-10">
                <Button
                  onClick={onBack}
                  variant="ghost"
                  icon={
                    <IconShape
                      icon={AngleLeft}
                      variant="circle"
                      color="custom"
                      customColor="(--text-heading)"
                    />
                  }
                  size="sm"
                  padding="xs"
                />
              </div>
            )}

            {/* Dinamik Başlık */}
            <h2 className="text-(--text-heading) text-lg font-bold truncate">
              {title}
            </h2>

            {/* Kapatma Butonu Alanı */}
            {onClose && (
              <div className="flex justify-end">
                <Button
                  onClick={onClose}
                  variant="ghost"
                  icon={
                    <IconShape
                      icon={Close}
                      variant="circle"
                      color="custom"
                      customColor="(--text-heading)"
                    />
                  }
                  size="sm"
                  padding="xs"
                />
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto text-(--text-heading)">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
