"use client";
import { FilterElementConfig } from "@/features/catalog/catalog.types";
import { Input, CheckBox, Toggle } from "@/components/common";
import { FilterSearch } from "./FilterSearch";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface FilterElementProps {
  config: FilterElementConfig;
  toggleFilter: (key: string, value: string) => void;
  setPriceRange: (min?: number, max?: number) => void;
  toggleBoolean: (key: string) => void;
}

export default function FilterElement({
  config,
  toggleFilter,
  setPriceRange,
  toggleBoolean,
}: FilterElementProps) {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const t = useTranslations("catalog");

  const filteredOptions = useMemo(() => {
    if (config.type !== "checkbox") return [];
    if (!searchValue.trim()) return config.options;
    const q = searchValue.toLowerCase();
    return config.options.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [config, searchValue]);

  return (
    <div className="space-y-4">
      {"search" in config && config.search && config.type === "checkbox" && (
        <FilterSearch
          value={searchValue}
          placeholder={config.search.placeholder}
          onChange={setSearchValue}
        />
      )}

      {/* TOGGLE */}
      {config.type === "toggle" && (
        <div className="flex items-center justify-start gap-2">
          <Toggle
            size="base"
            label={config.label}
            // getAll returns [] if absent, ["true"] if set — works for both
            checked={searchParams.getAll(config.key).includes("true")}
            onCheckedChange={() => toggleBoolean(config.key)}
          />
        </div>
      )}

      {/* RANGE */}
      {config.type === "range" && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Minimum</label>
              <Input
                type="number"
                min={config.min}
                placeholder="Min"
                inputSize="sm"
                className="text-center"
                wrapperClassName="flex-1"
                rightIcon={<></>}
                onChange={(e) =>
                  setPriceRange(
                    Number(e.target.value),
                    searchParams.get("maxPrice")
                      ? Number(searchParams.get("maxPrice"))
                      : undefined,
                  )
                }
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Maximum</label>
              <Input
                type="number"
                max={config.max}
                placeholder="Max"
                inputSize="sm"
                className="text-center"
                wrapperClassName="flex-1"
                rightIcon={<></>}
                onChange={(e) =>
                  setPriceRange(
                    searchParams.get("minPrice")
                      ? Number(searchParams.get("minPrice"))
                      : undefined,
                    Number(e.target.value),
                  )
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* CHECKBOX */}
      {config.type === "checkbox" && (
        <div>
          {config.label && (
            <label className="block mb-3 font-medium text-sm">
              {config.label}
            </label>
          )}
          <div
            className={`space-y-2 ${
              filteredOptions.length > 6
                ? "max-h-52 overflow-y-auto pr-1 custom-scrollbar"
                : ""
            }`}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                // getAll reads ALL repeated values: ?region=1&region=2 → ["1","2"]
                const isChecked = searchParams
                  .getAll(config.key)
                  .includes(opt.value);

                return (
                  <div key={opt.value} className="flex items-center gap-2">
                    <CheckBox
                      variant="square"
                      value={opt.value}
                      label={opt.label}
                      secondaryText={
                        opt.count !== undefined ? `(${opt.count})` : undefined
                      }
                      checked={isChecked}
                      onCheckedChange={() =>
                        toggleFilter(config.key, opt.value)
                      }
                    />
                  </div>
                );
              })
            ) : (
              <div className="font-normal text-xs text-(--text-fg-danger-strong)">
                &quot;{searchValue}&quot; {t("filters.noResults")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
