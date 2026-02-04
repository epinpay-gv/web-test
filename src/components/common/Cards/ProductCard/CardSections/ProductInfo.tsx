import { DesktopPc } from "flowbite-react-icons/outline";
import { Product } from "@/types/types";

interface ProductInfoProps {
  product: Product;
}
export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <>
      <p className="max-w-50 line-clamp-1">{product.translation.name}</p>
      <div className="text-xs flex gap-2 items-center">
        <DesktopPc size={20} />
        <span className="text-body">{product.region}</span>
      </div>
    </>
  );
}
