import { TitleData } from "@/components/common/Title/types";

export type FilterOption = { label: string; value: string };

export type SortOption = "price_asc" | "price_desc" | "name_asc" | "name_desc";

export type FilterStatus = "all" | "completed" | "pending" | "cancelled";

export type FilterElementConfig =
  | {
      type: "dropdown";
      key: string;
      label?: string;
      options: { label: string; value: string }[];
      search?: {
        placeholder?: string;
      };
    }
  | {
      type: "toggle";
      key: string;
      label: string;
    }
  | {
      type: "input";
      key: string;
      label: string;
      placeholder?: string;
    }
  | {
      type: "range";
      key: string;
      label?: string;
      min: number;
      max: number;
    }
  | {
      type: "checkbox";
      key: string;
      label?: string;
      options: { label: string; value: string; count?: number }[]; // varsa multi, yoksa single
      search?: {
        placeholder?: string;
      };
    }
  | {
      type: "dateRange";
      key: string;       // "date"
      keyFrom: string;   // "dateFrom"
      keyTo: string;     // "dateTo"
      label?: string;
    };

export interface FilterGroupConfig {
  isTab: boolean;
  isTitle: boolean;
  titleData?: TitleData;
  elements: FilterElementConfig[];
  locale: string;
}

export type ActiveFilterChip = {
  key: string;
  value: string;
  label: string;
};
