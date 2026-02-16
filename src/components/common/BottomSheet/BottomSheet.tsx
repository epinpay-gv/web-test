"use client"

import React, { useEffect } from "react"
import { Close, AngleLeft } from "flowbite-react-icons/outline"
import { Button } from "../Button/Button" 
import { IconShape } from "../IconSahpe/IconShape"

interface BottomSheetProps {
  isOpen: boolean
  onClose?: () => void
  onBack?: () => void 
  title?: string
  children: React.ReactNode
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  onBack,
  title,
  children,
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-60 " onClick={onClose} />
      
      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-70 flex flex-col animate-slide-up ">
        <div className="bg-(--bg-variants-gray) rounded-t-(--raidus-base) max-h-[85vh] w-full flex flex-col border-t border-(--border-default)">
          
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700/40">
            {/* Geri Butonu Alanı */}
            <div className="w-10">
              {onBack && (
                <Button onClick={onBack} variant="ghost" icon={<IconShape icon={AngleLeft} variant="circle" color="custom" customColor="(--text-heading)"/>} size="sm" padding="xs" />
              )}
            </div>

            {/* Dinamik Başlık */}
            <h2 className="text-(--text-heading) text-lg font-bold truncate">{title}</h2>

            {/* Kapatma Butonu Alanı */}
            <div className="flex justify-end">        
              {onClose && (<Button onClick={onClose} variant="ghost" icon={<IconShape icon={Close} variant="circle" color="custom" customColor="(--text-heading)"/>} size="sm" padding="xs" />)}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto text-(--text-heading)">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}