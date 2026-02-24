import PromotedCategories from "./PromotedCategories/PromotedCategories";
import { Promoted } from "../../mainpage.types";
import { TrustLabels } from "@/components/common";
import { PromotedHeading } from "./PromotedHeading/PromotedHeading";
import PromotedProductList from "./PromotedProductList/PromotedProductList";

interface PromotedSectionProps {
  data: Promoted;
}
export default function PromotedSection({ data }: PromotedSectionProps) {
  return (
    <div className="max-w-5xl mx-auto overflow-hidden rounded-b-2xl md:rounded-b-none flex gap-6 px-4 md:px-0 py-6 md:py-20">
      <div className="flex flex-col gap-6">
        {/* Heading */}
        <PromotedHeading/>

        {/* Categories (mobil) */}
        <div className="md:hidden">
          <PromotedCategories categories={data.categories} />
        </div>

        {/* Product List */}
        <PromotedProductList
          product={data.product}
          productVariants={data.productVariants}
        />

        {/* TrustLabels (mobil) */}
        <div className="md:hidden">
          <TrustLabels
            labelList={["instantDelivery", "licencedEpins", "securePayment"]}
            type="colorful"
          />
        </div>
      </div>

      {/* Categories (desktop) */}
      <div className="hidden md:block">
        <PromotedCategories categories={data.categories} />
      </div>

    </div>
  );
}
