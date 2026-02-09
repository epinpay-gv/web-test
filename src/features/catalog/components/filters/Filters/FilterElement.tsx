"use client";
import { FilterElementConfig, ToggleKeyMap } from "./types";
import { Input } from "@/components/common/Form/Input/Input";
import { Checkbox } from "@/components/common/CheckBox/CheckBox";
import { useCatalogFilters } from "@/features/catalog/store/catalogFilters.store";
import { Toggle } from "@/components/common/Toggle/Toggle";
import { FilterSearch } from "./FilterSearch";
import { useMemo, useState } from "react";

/**
 * Backend filter key → zustand store key mapping
 */
const mapFilterKey = (
  key: string,
): "category" | "region" | "platform" | null => {
  if (key === "games") return "category";
  if (key === "region") return "region";
  if (key === "platform") return "platform";
  return null;
};

const mapToggleKey = (key: string): ToggleKeyMap | null => {
  if (key === "in-tr") return "inTr";
  if (key === "in-stock") return "inStock";
  return null;
};

export default function FilterElement({
  config,
}: {
  config: FilterElementConfig;
}) {
  const filters = useCatalogFilters((s) => s.filters);
  const toggleFilter = useCatalogFilters((s) => s.toggleFilter);
  const setPriceRange = useCatalogFilters((s) => s.setPriceRange);
  const toggleBoolean = useCatalogFilters((s) => s.toggleBoolean);

  const [searchValue, setSearchValue] = useState("");

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
      {config.type === "toggle" &&
        (() => {
          const mappedKey = mapToggleKey(config.key);
          if (!mappedKey) return null;

          const isChecked = Boolean(filters[mappedKey]);

          return (
            <div className="flex items-center justify-start gap-2">
              <Toggle
                size="base"
                label={config.label}
                checked={isChecked}
                onCheckedChange={() => toggleBoolean(mappedKey)}
              />
            </div>
          );
        })()}

      {/* RANGE (FİYAT) */}
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
                  setPriceRange(Number(e.target.value), filters.price?.max)
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
                  setPriceRange(filters.price?.min, Number(e.target.value))
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
                const mappedKey = mapFilterKey(config.key);
                const isChecked =
                  mappedKey !== null && filters[mappedKey].includes(opt.value);
                return (
                  <div key={opt.value} className="flex items-center gap-2">
                    <Checkbox
                      variant="square"
                      value={opt.value}
                      label={opt.label}
                      secondaryText={
                        opt.count !== undefined ? `(${opt.count})` : undefined
                      }
                      checked={isChecked}
                      onCheckedChange={() => {
                        if (!mappedKey) return;
                        toggleFilter(mappedKey, opt.value);
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <div className="font-normal text-xs text-(--text-fg-danger-strong)">&quot;{searchValue}&quot; için sonuç bulunamadı</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
