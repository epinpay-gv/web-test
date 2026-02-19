
import PromotedProduct from "./PromotedProduct/PromotedProduct";
import PromotedCategories from "./PromotedCategories/PromotedCategories";
import { Promoted } from "../../mainpage.types";

interface PromotedSectionProps {
  promoted: Promoted;
}
export default function PromotedSection({ promoted }: PromotedSectionProps) {
  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-12 lg:mt-15 py-20">
        <PromotedProduct product={promoted.product} productVariants={promoted.productVariants} />
        <PromotedCategories categories={promoted.categories} />
      </div>

      {/* Mobile */}
      <div className="md:hidden pb-4">
        <PromotedProduct
          section="top"
          product={promoted.product}
          productVariants={promoted.productVariants}
        />
        <PromotedCategories categories={promoted.categories} />
        <PromotedProduct
          section="bottom"
          product={promoted.product}
          productVariants={promoted.productVariants}
        />
      </div>
    </div>
  );
}
