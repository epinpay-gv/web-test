import { TitleData } from "@/components/common/Title/types";

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
    };

export interface FilterGroupConfig {
  isTab: boolean;
  titleData?: TitleData;
  elements: FilterElementConfig[];
}

export type ToggleKeyMap = "inTr" | "inStock";