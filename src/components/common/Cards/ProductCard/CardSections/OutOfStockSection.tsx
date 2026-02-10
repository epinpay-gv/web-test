"use client";
import { NotifyWhenAvailablePayload } from "../types";
import { Button } from "@/components/common";

interface OutOfStockSectionProps {
  isHorizontal : boolean;
  notifyWhenAvailable: (payload: NotifyWhenAvailablePayload) => void;
}

export function OutOfStockSection({
  isHorizontal,
  notifyWhenAvailable,
}: OutOfStockSectionProps) {
  return (
    <>
      <p className="gap-2 flex items-center justify-end">
        <span className="text-fg-danger-strong">Stokta Yok</span>
      </p>
      <div className={`flex ${isHorizontal ? "": "w-full"} justify-between`}>
        <Button
          padding="sm"
          textSize="sm"
          variant="secondary"
          text="Gelince Haber Ver"
          className="w-full"
          onClick={() =>
            notifyWhenAvailable?.({
              productId: 0,
              userId: 0,
            })
          }
        />
      </div>
    </>
  );
}
