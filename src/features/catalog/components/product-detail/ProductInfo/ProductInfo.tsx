"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Product, ProductPlatform, ProductRegion } from "@/types/types";
import { Badge } from "@/components/common";
import FilterDropdownContainer from "./FilterDropdownContainer";

interface VariantOption {
  slug: string;
  name: string;
}

interface ProductInfoProps {
  data: Product;
  variants: VariantOption[];
  regions?: ProductRegion[];
  platforms?: ProductPlatform[];
  onVariantChange: (slug: string) => void;
  onRegionChange?: (id: number) => void;
  onPlatformChange?: (id: number) => void;
}

export default function ProductInfo({
  data,
  variants,
  regions = [],
  platforms = [],
  onVariantChange,
  onRegionChange,
  onPlatformChange,
}: ProductInfoProps) {
  const variantItems = useMemo(
    () =>
      variants.map((v) => ({
        id: v.slug,
        text: v.name,
      })),
    [variants],
  );

  const regionItems = useMemo(
    () =>
      regions.map((r) => ({
        id: String(r.id),
        text: r.translation.name,
      })),
    [regions],
  );

  const platformItems = useMemo(
    () =>
      platforms.map((p) => ({
        id: String(p.id),
        text: p.translation.name,
      })),
    [platforms],
  );

  return (
    <div className="flex gap-6">
      {/* Product Image */}
      <Image
        src={data.translation.imgUrl}
        alt={data.translation.imgAlt}
        width={224}
        height={224}
        priority
        className="rounded-lg object-cover w-29 h-29 md:w-56 md:h-56"
      />

      <div className="flex flex-col gap-6 flex-1">
        {/* Header */}
        <div className="flex md:flex-row flex-col md:items-center gap-2">
          <Badge text={data.type} theme="success" className="max-w-12"/>
          <h1 className="font-semibold text-xl text-(--text-heading)">
            {data.translation.name}
          </h1>
        </div>

        {/* Dropdown Section */}
        <div className="hidden md:flex item-center gap-4">
          {/* Points / Variant */}
          <div className="col-span-2">
            <FilterDropdownContainer
              title="Points"
              selectedId={data.translation.slug}
              items={variantItems}
              onSelect={(slug) => onVariantChange(slug)}
            />
          </div>

          {/* Platform */}
          <FilterDropdownContainer
            title="Platform"
            selectedId={String(data.platform_id)}
            items={platformItems}
            onSelect={(id) => onPlatformChange?.(Number(id))}
          />

          {/* Region */}
          <FilterDropdownContainer
            title="Region"
            selectedId={String(data.region_id)}
            items={regionItems}
            onSelect={(id) => onRegionChange?.(Number(id))}
          />
        </div>
      </div>
    </div>
  );
}
