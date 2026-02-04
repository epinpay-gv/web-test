"use client";
import { NotifyWhenAvailablePayload } from "../types";
import { Button } from "@/components/common/Button/Button";

interface OutOfStockSectionProps {
  notifyWhenAvailable: (payload: NotifyWhenAvailablePayload) => void;
}

export function OutOfStockSection({
  notifyWhenAvailable,
}: OutOfStockSectionProps) {
  return (
    <>
      <p className="gap-2 flex items-center justify-end font-medium">
        <span className="text-fg-danger-strong">Stokta Yok</span>
      </p>
      <div className="flex w-full justify-between">
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
