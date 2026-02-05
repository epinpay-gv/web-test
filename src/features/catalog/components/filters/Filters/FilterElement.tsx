"use client";
import { SearchInput } from "@/components/layout/Header/components/SearchInput";
import { FilterElementConfig } from "./types";
import { Input } from "@/components/common/Form/Input/Input";
import { Checkbox } from "@/components/common/CheckBox/CheckBox";

export default function FilterElement({
  config,
}: {
  config: FilterElementConfig;
}) {
  return (
    <div className="space-y-4">
      {"search" in config && config.search && <SearchInput />}

      {config.type === "dropdown" && (
        <div>
          <label className="block mb-1">{config.label}</label>
          <select className="w-full rounded border px-2 py-1">
            {config.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {config.type === "toggle" && (
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          <span>{config.label}</span>
        </label>
      )}

      {config.type === "input" && (
        <div>
          <label className="text-sm block mb-1">{config.label}</label>
          <input
            placeholder={config.placeholder}
            className="w-full rounded border px-2 py-1"
          />
        </div>
      )}

      {config.type === "range" && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div>
              <label className="block text-sm font-medium mb-2">Minimum</label>
              <Input
                type="number"
                min={config.min}
                placeholder="Min"
                inputSize="sm"
                className="text-center"
                wrapperClassName="flex-1"
                rightIcon={<></>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Maximum</label>
              <Input
                type="number"
                max={config.max}
                placeholder="Max"
                inputSize="sm"
                className="text-center"
                wrapperClassName="flex-1"
                rightIcon={<></>}
              />
            </div>
          </div>
        </div>
      )}

      {config.type === "checkbox" && (
        <div>
          {config.label && (
            <label className="block mb-3 font-medium text-sm">
              {config.label}
            </label>
          )}

          <div
            className={`space-y-2 ${
              config.options.length > 6 ? "max-h-52 overflow-y-auto pr-1 custom-scrollbar" : ""
            }`}
          >
            {config.options.map((opt) => (
              <div
                key={opt.value}
                className="flex items-center justify-start gap-2 w-56"
              >
                <Checkbox
                  variant="square"
                  value={opt.value}
                  label={opt.label}
                />

                {/* Count */}
                {typeof opt.count === "number" && (
                  <span className="text-sm text-body">
                    ({opt.count})
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
