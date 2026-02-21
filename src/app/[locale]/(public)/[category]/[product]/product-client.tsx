"use client";
import { Product } from "@/types/types";
import { Breadcrumb } from "@/components/common";
import { Home } from "flowbite-react-icons/outline";
import {
  BasketSection,
  ProductInfo,
  SeoSectionWithTab,
} from "@/features/catalog/components";
import {
  AddToFavoritesPayload,
  CategoryWithProductDetail,
  ChangeQuantityPayload,
  NotifyWhenAvailablePayload,
} from "@/features/catalog/catalog.types";
import { useProductSearch } from "@/features/catalog/hooks";
import { useBasketActions } from "@/features/catalog/hooks/basket/useBasketActions";

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
  const { changeVariant, changePlatform, changeRegion } = useProductSearch();
  const { addToCart, changeQuantity, addToFavorites, notifyWhenAvailable } =
    useBasketActions();

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
            onVariantChange={changeVariant}
            onPlatformChange={changePlatform}
            onRegionChange={changeRegion}
          />
          <SeoSectionWithTab
            initialCategory={initialCategory.categoryData}
            initialProduct={initialProduct}
          />
        </div>
        <BasketSection
          data={initialProduct}
          addToCart={addToCart}
          notifyWhenAvailable={notifyWhenAvailable}
          addToFavorites={addToFavorites}
          changeQuantity={changeQuantity}
        />
      </div>
    </div>
  );
}
