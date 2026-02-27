"use client";
import { useMemo, useState } from "react";
import { Category, Product } from "@/types/types";
import { ExpandableContent, NavTab, RatingCard } from "@/components/common";
import BoxWrapper from "@/components/common/Wrappers/BoxWrapper";
import DOMPurify from "dompurify";
import { useTranslations } from "next-intl";

interface SeoSectionWithTabProps {
  initialCategory: Category;
  initialProduct: Product;
}

export default function SeoSectionWithTab({
  initialCategory,
  initialProduct,
}: SeoSectionWithTabProps) {
  const t = useTranslations("catalog.productDetail");

  const tabs = [
    { label: t("productDescription"), value: "product-description" },
    { label: t("aboutGame"), value: "about-game" },
    { label: t("howToActivate"), value: "activation" },
    { label: t("reviews"), value: "reviews" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    const element = document.getElementById(value);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const aboutGame = initialCategory?.translation?.description ?? "";
  const description = initialProduct?.translation?.description ?? "";
  const activation = initialCategory?.translation?.activation ?? "";
  const categoryDescription = useMemo(
    () =>
      typeof window !== "undefined" ? DOMPurify.sanitize(aboutGame) : aboutGame,
    [aboutGame],
  );

  const productDescription = useMemo(
    () =>
      typeof window !== "undefined"
        ? DOMPurify.sanitize(description)
        : description,
    [description],
  );

  const activationDescription = useMemo(
    () =>
      typeof window !== "undefined"
        ? DOMPurify.sanitize(activation)
        : activation,
    [activation],
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="sticky top-0 z-20 py-2 bg-(--bg-variants-gray) w-full">
        <NavTab
          items={tabs}
          activeValue={activeTab}
          onChange={handleTabChange}
          variant="borderBottom"
        />
      </div>
      <div className="flex flex-col gap-10 pb-10">
        {initialCategory.translation.description && (
          <BoxWrapper
            id="product-description"
            title={t("productDescription")}
            className="scroll-mt-32"
          >
            <ExpandableContent maxHeight={300}>
              <div dangerouslySetInnerHTML={{ __html: productDescription }} />
            </ExpandableContent>
          </BoxWrapper>
        )}
        {initialCategory.translation.description && (
          <BoxWrapper
            id="about-game"
            title={t("aboutGame")}
            className="scroll-mt-32"
          >
            <ExpandableContent maxHeight={300}>
              <div dangerouslySetInnerHTML={{ __html: categoryDescription }} />
            </ExpandableContent>
          </BoxWrapper>
        )}
        {initialCategory.translation.activation && (
          <BoxWrapper
            id="activation"
            title={t("howToActivate")}
            className="scroll-mt-32"
          >
            <ExpandableContent maxHeight={300}>
              <div
                dangerouslySetInnerHTML={{ __html: activationDescription }}
              />
            </ExpandableContent>
          </BoxWrapper>
        )}
        {/* {initialCategory.translation.comments && (
          <BoxWrapper
            id="reviews"
            title={t("reviews")}
            className="scroll-mt-32"
          >
            <ExpandableContent maxHeight={300}>
              <div></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {initialCategory.translation.comments.map((item) => (
                  <RatingCard key={item.id} comment={item} />
                ))}
              </div>
            </ExpandableContent>
          </BoxWrapper>
        )} */}
      </div>
    </div>
  );
}
