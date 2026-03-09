import { Product } from "@/types/types";
import Badge from "@/components/common/Badges/Badge";
import { PLATFORM_ICON_MAP } from "./PlatformIcons";
import Image from "next/image";

interface ProductInfoProps {
  isLoading?: boolean;
  product: Product;
  isHorizontal: boolean;
}

export function ProductInfo({
  isLoading = false,
  product,
  isHorizontal,
}: ProductInfoProps) {
  const renderPlatformIcon = () => {
    if (product.platform_icon) {
      return (
        <div className="relative w-5 h-5">
          <Image
            src={product.platform_icon}
            alt={product.platform || "platform"}
            fill
            className="object-contain grayscale opacity-80"
            sizes="20px"
          />
        </div>
      );
    }

    return PLATFORM_ICON_MAP[product.platform_id] ?? null;
  };

  if (isLoading) {
    return (
      <section className="flex flex-col gap-2">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <div
            className={`h-4 rounded bg-gray-200 shimmer ${
              isHorizontal ? "w-full" : "md:w-50"
            }`}
          />
          <div
            className={`h-4 rounded bg-gray-200 shimmer ${
              isHorizontal ? "w-full" : "md:w-50"
            }`}
          />
        </div>

        {/* Region + platform */}
        <div className="flex gap-2 items-center">
          {/* Type */}
          {isHorizontal && (
            <div className="h-4 md:w-12 rounded-full bg-gray-200 shimmer" />
          )}

          {/* Platform */}
          <div className="w-5 h-5 rounded-full bg-gray-200 shimmer" />

          {/* Region */}
          <div className="h-4 w-10 rounded-full bg-gray-200 shimmer" />
        </div>
      </section>
    );
  }

  return (
    <section>
      <p
        className={`text-sm h-10.5 ${
          isHorizontal
            ? "max-w-none whitespace-normal line-clamp-2 md:line-clamp-none"
            : "max-w-50 line-clamp-2"
        }`}
      >
        {product.translation.name}
      </p>

      <div className="text-xs flex gap-2 items-center">
        {isHorizontal && (
          <Badge text={product.type} theme="success_outline" type="default" />
        )}

        {renderPlatformIcon()}

        <Badge text={product.region} theme="gray_unborder" />
      </div>
    </section>
  );
}
