import { Sort } from "flowbite-react-icons/outline";
import FilterDropdownContainer from "./filters/Filters/FilterDropdownContainer";
import { useTranslations } from "next-intl";
import { FilterGroupConfig } from "../catalog.types";

interface PageTitleProps {
  data: {
    title: string;
    totalProductAmount: number;
  };
  isLoading?: boolean;
  titleFilter?: FilterGroupConfig;
  onSortSelect: (value: string) => void;
  currentSort?: string;
}

export default function PageTitle({
  data,
  isLoading = false,
  titleFilter,
  onSortSelect,
  currentSort,
}: PageTitleProps) {
  const t = useTranslations("common.labels");

  const dropdownEl = titleFilter?.elements.find((el) => el.type === "dropdown");
  const dropdownItems =
    dropdownEl?.type === "dropdown"
      ? dropdownEl.options.map((opt) => ({
          id: opt.value,
          text: opt.label,
          value: opt.value,
        }))
      : [];

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm md:text-xl flex items-center gap-2">
        {isLoading ? (
          <>
            <div className="h-6 w-40 rounded-md bg-gray-200 shimmer" />
            <div className="h-5 w-20 rounded-md bg-gray-200 shimmer" />
          </>
        ) : (
          <>
            <h1>
              {data.title} {t("listing")}
            </h1>
            <p className="text-(--text-body)">
              {data.totalProductAmount} {t("product")}
            </p>
          </>
        )}
      </div>
      {/* Sort */}
      <div className="hidden md:block">
        <FilterDropdownContainer
          selectedId={currentSort ?? ""}
          items={dropdownItems}
          onSelect={onSortSelect}
          icon={<Sort size={16} className="text-(--text-body)" />}
        />
      </div>
    </div>
  );
}
