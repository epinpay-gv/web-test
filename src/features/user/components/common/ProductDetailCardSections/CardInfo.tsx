import { BffOrderItem } from "@/features/user/user.types";
import Image from "next/image";

interface CardInfoProps {
  product: BffOrderItem;
}

export default function CardInfo({ product }: CardInfoProps) {
  return (
    <div className="flex items-center gap-4 md:w-105.5 text-(--text-body)">
      {product.productImage && (
        <Image src={product.productImage} alt={product.productName ?? ""} width={72} height={72} className="rounded-lg" />
      )}
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold line-clamp-2 wrap-break-word h-10.5">
          {product.productName}
        </div>
        <div className="flex justify-between text-xs text-(--text-body)">
          <div className="flex gap-2">
            {product.typeCode && <span>{product.typeCode}</span>}
          </div>
          <div className="font-semibold">
            {product.price}
          </div>
        </div>
      </div>
    </div>
  );
}
