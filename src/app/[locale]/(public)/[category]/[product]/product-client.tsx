"use client";
import { Category, Product } from "@/types/types";
import { Breadcrumb } from "@/components/common";
import { Home } from "flowbite-react-icons/outline";
import { BasketSection, ProductInfo, SeoSectionWithTab } from "@/features/catalog/components";

interface ProductClientProps {
  initialProduct: Product;
  initialCategory: Category;
  breadcrumbItems: {
    name: string;
    url: string;
  }[];
}

export default function ProductClient({ initialProduct, initialCategory, breadcrumbItems }: ProductClientProps) {
  return (
    <div className="container max-w-5xl mx-auto pb-12 py-6 space-y-4">
      <Breadcrumb
        items={breadcrumbItems.map((item, index) => ({
          ...item,
          icon: index === 0 ? <Home size={14} /> : undefined,
        }))}
      />

      <div className="flex md:flex-row flex-col items-start gap-4">
        <div className="flex-1 flex flex-col gap-10 ">
          <ProductInfo data={initialProduct} />
          <SeoSectionWithTab initialCategory={initialCategory} initialProduct={initialProduct}/>
        </div>
        <BasketSection data={initialProduct}/>
      </div>
    </div>
  );
}
