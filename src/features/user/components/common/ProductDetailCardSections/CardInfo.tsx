import { OrderProduct } from "@/features/user/user.types";
import { PRODUCT_CATEGORY_LABELS } from "@/features/user/utils/status.mappers";
import Image from "next/image";

interface CardInfoProps {
  product: OrderProduct;
}
export default function CardInfo({ product }: CardInfoProps) {
  return (
    <div className="flex items-center gap-4 md:w-105.5 text-(--text-body)">
      <Image src={product.imageUrl} alt={product.name} width={72} height={72} className="rounded-lg"/>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold line-clamp-2 wrap-break-word h-10.5">
          {product.name}
        </div>

        <div className="flex justify-between text-xs text-(--text-body)">
          <div className="flex gap-2">
            {PRODUCT_CATEGORY_LABELS[product.category]}
            <div>{product.region}</div>
          </div>
          <div className="font-semibold">
            {product.currency}
            {product.price}
          </div>
        </div>
      </div>
    </div>
  );
}
