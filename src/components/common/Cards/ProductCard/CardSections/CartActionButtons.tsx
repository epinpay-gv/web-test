"use client";

import { TrashBin, AngleDown } from "flowbite-react-icons/outline";
import { ChangeQuantityPayload } from "@/features/catalog/catalog.types";
import { Product } from "@/types/types";
import { Button } from "@/components/common";
import DropdownMenu from "@/components/common/Dropdown/DropdownMenu";

interface CartActionButtonsProps {
  product: Product;
  changeQuantity: (payload: ChangeQuantityPayload) => void;
}

export function CartActionButtons({ product, changeQuantity }: CartActionButtonsProps) {
  const quantityItems = [1, 2, 3, 4, 5].map((num) => ({
    id: String(num),
    text: `${num} Adet`,
    value: num,
    checked: product.quantity === num
  }));

  const currentQuantityLabel = `${product.quantity || 1} Adet`;
  return (
    <div className="flex items-center justify-start gap-3 h-8">
      <div className="w-32">
        <DropdownMenu
          title="Adet Seçin"
          width="100%"
          items={quantityItems}
          onSelect={(item) => {
            changeQuantity({
              productId: Number(product.id),
              offerId: Number(product.cheapestOffer),
              action: "update",
              quantity: Number(item.value)
            });
          }}
          trigger={
            <div className="flex items-center justify-between w-full border border-(--border-default) rounded-full px-4 py-1.5 text-xs text-(--text-body) bg-(--bg-neutral-primary-soft) hover:border-cyan-500/50 transition-colors">
              <span>{currentQuantityLabel}</span>
              <AngleDown className="w-4 h-4 text-gray-400" />
            </div>
          }
        />
      </div>

      {/* Silme Butonu */}
      <div>
        <Button          
          className="rounded-full p-1!"
          variant="secondary" 
          size="xs"
          icon={<TrashBin size={14} className="text-(--text-body)" />}
          onClick={() =>
            changeQuantity({
              productId: Number(product.id),
              offerId: Number(product.cheapestOffer),
              action: "remove",
              quantity: Number(product.quantity)
            })
          }
        ></Button>
      </div>
    </div>
  );
}
