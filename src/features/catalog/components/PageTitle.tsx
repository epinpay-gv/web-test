import { Sort } from "flowbite-react-icons/outline";
import FilterDropdownContainer from "./filters/Filters/FilterDropdownContainer";

interface PageTitleProps {
  data: {
    title: string;
    totalProductAmount: number;
  };
  onSelect: (id: string) => void;
  isLoading?: boolean;
}

export default function PageTitle({
  data,
  onSelect,
  isLoading = false,
}: PageTitleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm md:text-xl flex items-center gap-2">
        {isLoading ? (
          <>
            <div className="h-6 w-40 rounded-md bg-gray-200 animate-pulse" />
            <div className="h-5 w-20 rounded-md bg-gray-200 animate-pulse" />
          </>
        ) : (
          <>
            <h1>{data.title} listeleniyor</h1>
            <p className="text-(--text-body)">{data.totalProductAmount} ürün</p>
          </>
        )}
      </div>
      {/* Sort */}
      {/* <FilterDropdownContainer
        selectedId=""
        items={[]}
        onSelect={onSelect}
        icon={<Sort size={16} className="text-(--text-body)" />}
      /> */}
    </div>
  );
}
