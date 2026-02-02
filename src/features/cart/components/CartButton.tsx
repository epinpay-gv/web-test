"use client";

import { useCartStore } from "../store/cart.store";
import { Cart } from "flowbite-react-icons/outline";
import { Button } from "@/components/common/Button/Button";

export function CartButton() {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <button className="relative p-2 text-(--text-body) hover:bg-(--bg-neutral-tertiary) rounded-md transition-colors outline-none group">
      <Cart className="w-6 h-6 transition-colors" />
      {itemCount > 0 && (
        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white ring-2 ring-(--bg-neutral-secondary-soft)">
          {itemCount}
        </span>
      )}
    </button>
  );
}