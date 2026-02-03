"use client";
import { SearchInput } from "@/components/layout/Header/components/SearchInput";
import { FilterElementConfig } from "./types";

export default function FilterElement({
  config,
}: {
  config: FilterElementConfig;
}) {
  return (
    <div className="space-y-2">
      {"search" in config && config.search && (
        <SearchInput />

      )}

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
          <label className="block mb-1">{config.label}</label>
          <input
            placeholder={config.placeholder}
            className="w-full rounded border px-2 py-1"
          />
        </div>
      )}

      {config.type === "range" && (
        <div>
          <label className="block mb-1">{config.label}</label>
          <div className="flex gap-2">
            <input type="number" min={config.min} max={config.max} />
            <input type="number" min={config.min} max={config.max} />
          </div>
        </div>
      )}

      {config.type === "checkbox" && (
        <div>
          {config.label && (
            <label className="block mb-1 font-medium">{config.label}</label>
          )}

          <div
            className={`space-y-1 ${
              config.options.length > 6 ? "max-h-48 overflow-y-auto pr-1" : ""
            }`}
          >
            {config.options.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  <input type="checkbox" value={opt.value} />
                  <span>{opt.label}</span>
                </div>

                {/* Count */}
                {typeof opt.count === "number" && (
                  <span className="text-xs text-gray-500">({opt.count})</span>
                )}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
