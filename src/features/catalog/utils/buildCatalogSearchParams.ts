import { CatalogFilterState } from "../catalog.types";

export function buildCatalogSearchParams(
  filters: CatalogFilterState,
): URLSearchParams {
  const params = new URLSearchParams();

  filters.category.forEach((v) => params.append("category", v));
  filters.region.forEach((v) => params.append("region", v));
  filters.platform.forEach((v) => params.append("platform", v));
  filters.productType.forEach((v) => params.append("productType", v));

  if (filters.price?.min !== undefined) {
    params.set("minPrice", String(filters.price.min));
  }

  if (filters.price?.max !== undefined) {
    params.set("maxPrice", String(filters.price.max));
  }

  return params;
}
