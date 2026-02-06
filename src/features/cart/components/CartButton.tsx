"use client";

import { useCartStore } from "../store/cart.store";
import { Cart } from "flowbite-react-icons/outline";
import { Button } from "@/components/common/Button/Button";
import { IconShape } from "@/components/common/IconSahpe/IconShape";

export function CartButton() {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative inline-flex">
      <Button
        variant="ghost"
        appearance="filled"
        padding="xs"
        className="border-none! focus:ring-0" 
        icon={<Cart className="md:w-5 md:h-5 w-4 h-4 transition-colors" />}
      />
      {/* <IconShape 
        icon={Cart} 
        color="custom" 
        customColor="var(--text-heading)" 
        variant="square" 
        size="lg"
        className="md:hidden"
      /> */}
      
      {itemCount > 0 && (
        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-(--bg-neutral-secondary-soft) pointer-events-none z-10">
          {itemCount}
        </span>
      )}
    </div>
  );
}