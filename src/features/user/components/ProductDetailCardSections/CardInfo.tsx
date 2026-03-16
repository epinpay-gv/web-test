import Image from "next/image";
import { OrderProduct } from "../../user.types";
import { PRODUCT_CATEGORY_LABELS } from "../../utils/status.mappers";

interface CardInfoProps {
  product: OrderProduct;
}
export default function CardInfo({ product }: CardInfoProps) {
  return (
    <div className="flex items-center gap-4 flex-1 min-w-0">
      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-(--bg-neutral-secondary) shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-sm font-semibold text-(--text-body) line-clamp-2 wrap-break-word">
          {product.name}
        </span>

        {product.description && (
          <span className="text-xs text-(--text-body) truncate">
            {product.description}
          </span>
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs text-(--text-body)">
          <span className="inline-flex items-center gap-1 bg-(--bg-neutral-primary-soft) border border-(--border-default) px-1 py-0.5 rounded-sm">
            {PRODUCT_CATEGORY_LABELS[product.category]}
          </span>
          {product.region && (
            <span className="truncate max-w-30">{product.region}</span>
          )}
          <span className="font-semibold items-end">
            {product.currency}
            {product.price}
          </span>
        </div>
      </div>
    </div>
  );
}
