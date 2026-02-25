import { DesktopPc } from "flowbite-react-icons/outline";
import { Product } from "@/types/types";
import Link from "next/link";
import Badge from "@/components/common/Badges/Badge";
import { PLATFORM_ICON_MAP } from "./PlatformIcons"; 
import Image from "next/image";

interface ProductInfoProps {
  product: Product;
  isHorizontal : boolean;
}
export function ProductInfo({ product, isHorizontal }: ProductInfoProps) {
  const renderPlatformIcon = () => {
    if (product.platform_icon) {
      return (
        <div className="relative w-5 h-5">
          <Image 
            src={product.platform_icon} 
            alt={product.platform || "platform"} 
            fill 
            className="object-contain grayscale opacity-80" 
          />
        </div>
      );
    }
    return PLATFORM_ICON_MAP[product.platform_id] || <></>;
  };
  return (
    <>
      <Link href={`${product.translation.category_slug}/${product.translation.slug}`}>
        <p className={`text-sm h-10.5 ${isHorizontal ? "max-w-none whitespace-normal line-clamp-2 md:line-clamp-none" : "max-w-50 line-clamp-2"}`}>{product.translation.name}</p>
        <div className="text-xs flex gap-2 items-center">
          {isHorizontal && <Badge text={product.type} theme="success_outline" type="default"/>}                            
          <span> {renderPlatformIcon()} </span>
          <Badge text={product.region} theme="gray_unborder"/>    
        </div>
      </Link>
    </>
  );
}
