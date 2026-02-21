"use client";
import { Product } from "@/types/types";
import { Breadcrumb } from "@/components/common";
import { Home } from "flowbite-react-icons/outline";
import {
  BasketSection,
  ProductInfo,
  SeoSectionWithTab,
} from "@/features/catalog/components";
import { useRouter, useParams } from "next/navigation";
import { CategoryWithProductDetail } from "@/features/catalog/catalog.types";

interface ProductClientProps {
  initialProduct: Product;
  initialCategory: CategoryWithProductDetail;
  breadcrumbItems: {
    name: string;
    url: string;
  }[];
}

export default function ProductClient({
  initialProduct,
  initialCategory,
  breadcrumbItems,
}: ProductClientProps) {
  const router = useRouter();
  const params = useParams();

  const handleVariantChange = (newSlug: string) => {
    const { locale, category } = params as {
      locale: string;
      category: string;
    };

    router.push(`/${locale}/${category}/${newSlug}`);
  };

  const handlePlatformChange = (id: number) => {
    const { locale, category, product } = params as {
      locale: string;
      category: string;
      product: string;
    };

    router.push(`/${locale}/${category}/${product}?platform=${id}`);
  };

  const handleRegionChange = (id: number) => {
    const { locale, category, product } = params as {
      locale: string;
      category: string;
      product: string;
    };

    router.push(`/${locale}/${category}/${product}?region=${id}`);
  };

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
          <ProductInfo
            data={initialProduct}
            variants={initialCategory.variants.map((p) => ({
              slug: p.translation.slug,
              name: p.translation.name,
            }))}
            regions={initialCategory.regions}
            platforms={initialCategory.platforms}
            onVariantChange={handleVariantChange}
            onRegionChange={handleRegionChange}
            onPlatformChange={handlePlatformChange}
          />
          <SeoSectionWithTab
            initialCategory={initialCategory.categoryData}
            initialProduct={initialProduct}
          />
        </div>
        <BasketSection data={initialProduct} />
      </div>
    </div>
  );
}
