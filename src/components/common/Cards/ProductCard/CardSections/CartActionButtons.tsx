"use client";
import { TrashBin } from "flowbite-react-icons/outline";
import { ChangeQuantityPayload } from "../types";
import { Product } from "@/types/types";
import { Button } from "@/components/common";

interface CartActionButtonsProps {
  product: Product;
  changeQuantity: (payload: ChangeQuantityPayload) => void;
}

export function CartActionButtons({
  product,
  changeQuantity,
}: CartActionButtonsProps) {
  const options = [
    { value: 1, label: "1 Adet" },
    { value: 2, label: "2 Adet" },
    { value: 3, label: "3 Adet" },
    { value: 4, label: "4 Adet" },
    { value: 5, label: "5 Adet" },
  ];

  return (
    <div className="flex items-center justify-start gap-2 w-80 h-6">
      <div>
        <select className="w-full rounded-full border-2 px-4 py-1 text-body text-xs">
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="w-5.5 h-5.5">
        <Button
          padding="rounded"
          textSize="sm"
          variant="secondary"
          icon={<TrashBin className="w-3.5 h-3.5" />}
          className="rounded-full w-full h-full"
          onClick={() =>
            changeQuantity?.({
              action: "---",
              offerId: 0,
            })
          }
        />
      </div>
    </div>
  );
}
