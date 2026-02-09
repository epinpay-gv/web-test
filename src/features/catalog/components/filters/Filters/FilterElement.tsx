"use client";
import { SearchInput } from "@/components/layout/Header/components/SearchInput";
import { FilterElementConfig } from "./types";
import { Input } from "@/components/common/Form/Input/Input";
import { Checkbox } from "@/components/common/CheckBox/CheckBox";
import { useCatalogFilters } from "@/features/catalog/store/catalogFilters.store";

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

export default function FilterElement({
  config,
}: {
  config: FilterElementConfig;
}) {
  const filters = useCatalogFilters((s) => s.filters);
  const toggleFilter = useCatalogFilters((s) => s.toggleFilter);
  const setPriceRange = useCatalogFilters((s) => s.setPriceRange);

  return (
    <div className="space-y-4">
      {"search" in config && config.search && <SearchInput />}

      {/* TOGGLE (şimdilik pasif) */}
      {config.type === "toggle" && (
        <label className="flex items-center gap-2 opacity-50 cursor-not-allowed">
          <input type="checkbox" disabled />
          <span>{config.label}</span>
        </label>
      )}

      {/* RANGE (FİYAT) */}
      {config.type === "range" && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Minimum
              </label>
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
                    filters.price?.max,
                  )
                }
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Maximum
              </label>
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
                    filters.price?.min,
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
              config.options.length > 6
                ? "max-h-52 overflow-y-auto pr-1 custom-scrollbar"
                : ""
            }`}
          >
            {config.options.map((opt) => {
              const mappedKey = mapFilterKey(config.key);
              const isChecked =
                mappedKey !== null &&
                filters[mappedKey].includes(opt.value);
              return (
                <div
                  key={opt.value}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    variant="square"
                    value={opt.value}
                    label={opt.label}
                    secondaryText={
                      opt.count !== undefined
                        ? `(${opt.count})`
                        : undefined
                    }
                    checked={isChecked}
                    onCheckedChange={() => {
                      if (!mappedKey) return ;
                      toggleFilter(mappedKey, opt.value);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
