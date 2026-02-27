"use client";
import { useMemo } from "react";
import { Category } from "@/types/types";
import {
  AccordionItem,
  ExpandableContent,
  RatingCard,
} from "@/components/common";
import BoxWrapper from "@/components/common/Wrappers/BoxWrapper";
import DOMPurify from "dompurify";
import { useTranslations } from "next-intl";

interface SeoSectionProps {
  initialCategory: Category;
}

export default function SeoSection({ initialCategory }: SeoSectionProps) {
  const t = useTranslations("catalog.productDetail");
  const description = initialCategory?.translation?.description ?? "";
  const activation = initialCategory?.translation?.activation ?? "";

  const categoryDescription = useMemo(
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
    <div className="flex flex-col gap-10 pb-10 px-4 md:px-4">
      {initialCategory.translation.description && (
        <BoxWrapper title={t("productDescription")}>
          <ExpandableContent maxHeight={400}>
            <div dangerouslySetInnerHTML={{ __html: categoryDescription }} />
          </ExpandableContent>
        </BoxWrapper>
      )}
      {initialCategory.translation.activation && (
        <BoxWrapper title={t("howToActivate")}>
          <ExpandableContent maxHeight={400}>
            <div dangerouslySetInnerHTML={{ __html: activationDescription }} />
          </ExpandableContent>
        </BoxWrapper>
      )}
      {initialCategory.translation.faq && (
        <BoxWrapper title={t("faq")}>
          {initialCategory.translation.faq.map((item) => (
            <AccordionItem key={item.id} title={item.name}>
              {item.description}
            </AccordionItem>
          ))}
        </BoxWrapper>
      )}
      {/* {initialCategory.translation.comments && (
        <BoxWrapper title={t("reviews")}>
          <ExpandableContent maxHeight={400}>
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
  );
}
