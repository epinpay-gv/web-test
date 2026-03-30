"use client"
import { Sort } from "flowbite-react-icons/outline";
import FilterDropdownContainer from "../../filters/components/Filters/FilterDropdownContainer";
import { useTranslations } from "next-intl";
import { FilterGroupConfig } from "@/features/filters/filters.types";
import { useUrlFilters } from "@/features/filters/hooks/useUrlFilters";
import { BreadcrumbItem } from "@/types/types";

interface PageTitleProps {
  initialFilters: FilterGroupConfig[];
  breadcrumbItems: BreadcrumbItem[];
  totalProductAmount: number;
  sort?: boolean;
}

export default function PageTitle({
  initialFilters,
  breadcrumbItems,
  totalProductAmount,
  sort = true,
}: PageTitleProps) {
  const t = useTranslations("common.labels");

  const { searchParams, isPending, handleSortChange } =
    useUrlFilters(initialFilters);

  const titleFilters = initialFilters.find((g) => g.isTitle);

  const dropdownEl = titleFilters?.elements.find(
    (el) => el.type === "dropdown",
  );
  const dropdownItems =
    dropdownEl?.type === "dropdown"
      ? dropdownEl.options.map((opt) => ({
          id: opt.value,
          text: opt.label,
          value: opt.value,
        }))
      : [];
  const defaultSort =
    dropdownEl?.type === "dropdown" ? (dropdownEl.options[0]?.value ?? "") : "";
  const currentSort = searchParams.get("sort") ?? defaultSort;

  const pageTitle = breadcrumbItems[2]
    ? `${breadcrumbItems[2].name} ürünleri`
    : "Tüm ürünler";

  if (isPending) {
    return (
      <div className="flex items-center justify-between">
        {/* Title */}
        <div className="text-sm md:text-xl flex items-center gap-2">
          <div className="h-6 w-40 rounded-md bg-gray-200 shimmer" />
          <div className="h-5 w-20 rounded-md bg-gray-200 shimmer" />
        </div>

        {/* Sort Button */}
        {sort && (
          <div className="hidden md:block">
            <div className="w-36 h-10 rounded-md bg-gray-200 shimmer" />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm md:text-xl flex items-center gap-2">
        <h1>
          {pageTitle} {t("listing")}
        </h1>
        <p className="text-(--text-body)">
          {totalProductAmount} {t("product")}
        </p>
      </div>
      {/* Sort */}
      {sort && handleSortChange && (
        <div className="hidden md:block">
          <FilterDropdownContainer
            selectedId={currentSort ?? ""}
            items={dropdownItems}
            onSelect={handleSortChange}
            icon={<Sort size={16} className="text-(--text-body)" />}
            align="right"
          />
        </div>
      )}
    </div>
  );
}
