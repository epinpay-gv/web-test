"use client";

import { TrashBin, AngleDown } from "flowbite-react-icons/outline";
import { ChangeQuantityPayload } from "@/features/catalog/catalog.types";
import { Product } from "@/types/types";
import { Button } from "@/components/common";
import DropdownMenu from "@/components/common/Dropdown/DropdownMenu";

interface CartActionButtonsProps {
  product: Product;
  changeQuantity: (payload: ChangeQuantityPayload) => void;
  onRemove?: () => void;
}

export function CartActionButtons({ product, changeQuantity, onRemove }: CartActionButtonsProps) {
  const quantityItems = [1, 2, 3, 4, 5].map((num) => ({
    id: String(num),
    text: `${num} Adet`,
    value: num,
    checked: product.quantity === num,
  }));

  const currentQuantityLabel = `${product.quantity || 1} Adet`;

  const handleQuantitySelect = (selectedQuantity: number) => {
    if (selectedQuantity === product.quantity) return;
    changeQuantity({
      productId: Number(product.id),
      offerId: Number(product.cheapestOffer),
      action: "update",
      quantity: selectedQuantity,
    });
  };

  return (
    <div className="flex items-center justify-start gap-3 h-8">
      <div className="w-32">
        <DropdownMenu
          title="Adet Seçin"
          width="100%"
          items={quantityItems}
          onSelect={(item) => handleQuantitySelect(Number(item.value))}
          trigger={
            <div className="flex items-center justify-between w-full border border-(--border-default) rounded-full px-4 py-1.5 text-xs text-(--text-body) bg-(--bg-neutral-primary-soft) hover:border-cyan-500/50 transition-colors">
              <span>{currentQuantityLabel}</span>
              <AngleDown className="w-4 h-4 text-gray-400" />
            </div>
          }
        />
      </div>

      <div>
        <Button
          className="rounded-full p-1!"
          variant="secondary"
          size="xs"
          icon={<TrashBin size={14} className="text-(--text-body)" />}
          onClick={() => onRemove?.()}
        />
      </div>
    </div>
  );
}