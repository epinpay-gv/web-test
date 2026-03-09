import { NavLink } from "@/components/common";
import { useTranslations } from "next-intl";

interface PromotedProductListProps {
  product: {
    name: string;
    slug: string;
  };
  productVariants: {
    id: number;
    name: string;
    price: number;
    slug: string;
  }[];
  className?: string;
}

export default function PromotedProductList({
  product,
  productVariants,
  className,
}: PromotedProductListProps) {
  const t = useTranslations("mainpage.promoted");

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-2 w-full">
        <p>{product.name}</p>
        <NavLink
          title={t("viewAllProducts")}
          url={product.slug}
          titleType="highlight"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {productVariants.map((item, index) => (
          <NavLink
            key={index}
            title={item.name}
            url={item.slug}
            type="withContainer"
            helper={`$ ${item.price}`}
            helperType="green"
          />
        ))}
      </div>
    </div>
  );
}
