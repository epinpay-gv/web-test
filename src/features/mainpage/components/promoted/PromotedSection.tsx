import PromotedProduct from "./PromotedProduct/PromotedProduct";
import PromotedCategories from "./PromotedCategories/PromotedCategories";
import { Promoted } from "../../mainpage.types";

interface PromotedSectionProps {
  data: Promoted;
}
export default function PromotedSection({ data }: PromotedSectionProps) {
  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 px-4 md:px-0 py-6 md:py-20">
      <PromotedProduct
        product={data.product}
        productVariants={data.productVariants}
      />
      <PromotedCategories categories={data.categories} />
    </div>
  );
}
