import { DesktopPc } from "flowbite-react-icons/outline";
import { Product } from "@/types/types";

interface ProductInfoProps {
  product: Product;
  isHorizontal : boolean;
}
export function ProductInfo({ product, isHorizontal }: ProductInfoProps) {
  return (
    <>
      <p className={`${isHorizontal ? "max-w-none whitespace-normal" : "max-w-50 line-clamp-1 truncate"}`}>{product.translation.name}</p>
      <div className="text-xs flex gap-2 items-center">
        <DesktopPc size={20} />
        <span className="text-body">{product.region}</span>
      </div>
    </>
  );
}
