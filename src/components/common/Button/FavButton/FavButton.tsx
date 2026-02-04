import { ButtonHTMLAttributes } from "react";
import { Heart } from "flowbite-react-icons/outline";
import { NotifyWhenAvailablePayload } from "../../Cards/ProductCard/types";

interface FavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFavorite?: boolean;
  addToFavorites?: (payload: NotifyWhenAvailablePayload) => void;
}

export function FavButton({
  isFavorite = false,
  addToFavorites,
  ...props
}: FavButtonProps) {
  return (
    <button
      {...props}
      onClick={() => addToFavorites?.({ productId: 0, userId: 0 })}
      className="rounded-full bg-[#1E293999]/80 w-6.5 h-6.5 p-1.5 cursor-pointer hover:bg-[#1E293999] transition-colors"
    >
      <Heart size={14} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
    </button>
  );
}