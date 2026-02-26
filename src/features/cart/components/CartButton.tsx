"use client";
import { useCartStore } from "../store/cart.store";
import { Cart } from "flowbite-react-icons/outline";
import { Button } from "@/components/common";

export function CartButton() {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative inline-flex">
      <Button
        name="Sepet"
        aria-label="Sepet"
        variant="ghost"
        appearance="filled"
        padding="sm"
        className="border-none! focus:ring-0"
        icon={<Cart className="lg:w-7 lg:h-7 w-6 h-6 transition-colors" />}
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
