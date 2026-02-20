import PromotedProduct from "./PromotedProduct/PromotedProduct";
import PromotedCategories from "./PromotedCategories/PromotedCategories";
import { Promoted } from "../../mainpage.types";

interface PromotedSectionProps {
  promoted: Promoted;
}
export default function PromotedSection({ promoted }: PromotedSectionProps) {
  return (
    <div className="max-w-5xl mx-auto hidden md:grid md:grid-cols-2 gap-6 py-20">
      <PromotedProduct
        product={promoted.product}
        productVariants={promoted.productVariants}
      />
      <PromotedCategories categories={promoted.categories} />
    </div>
  );
}
