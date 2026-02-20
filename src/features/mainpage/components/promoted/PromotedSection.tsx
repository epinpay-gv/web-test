import PromotedProduct from "./PromotedProduct/PromotedProduct";
import PromotedCategories from "./PromotedCategories/PromotedCategories";
import { Promoted } from "../../mainpage.types";

interface PromotedSectionProps {
  promoted: Promoted;
}
export default function PromotedSection({ promoted }: PromotedSectionProps) {
  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 px-4 md:px-0 py-6 md:py-20">
      <PromotedProduct
        product={promoted.product}
        productVariants={promoted.productVariants}
      />
      <PromotedCategories categories={promoted.categories} />
    </div>
  );
}
