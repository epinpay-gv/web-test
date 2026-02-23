// src/features/catalog/utils/breadcrumb.ts

export interface BreadcrumbItem {
  name: string;
  url: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

function base(locale: string): BreadcrumbItem[] {
  return [
    {
      name: locale === "en" ? "Home" : "Anasayfa",
      url: `${SITE_URL}/${locale}`,
    },
  ];
}

function categoriesRoot(locale: string): BreadcrumbItem {
  return {
    name: locale === "en" ? "Categories" : "Kategoriler",
    url: `${SITE_URL}/${locale}/categories`,
  };
}

function productsRoot(locale: string): BreadcrumbItem {
  return {
    name: locale === "en" ? "Products" : "Ürünler",
    url: `${SITE_URL}/${locale}/products`,
  };
}

/* -------------------------------------------------------------------------- */
/*                                CATEGORIES PAGE                             */
/* -------------------------------------------------------------------------- */

export function createCategoriesBreadcrumb(locale: string): BreadcrumbItem[] {
  return [...base(locale), categoriesRoot(locale)];
}

/* -------------------------------------------------------------------------- */
/*                                PRODUCTS PAGE                               */
/* -------------------------------------------------------------------------- */

export function createProductsBreadcrumb(
  locale: string,
  productType?: { label: string; value: string },
): BreadcrumbItem[] {
  const items = [...base(locale), productsRoot(locale)];

  if (productType) {
    items.push({
      name: productType.label,
      url: `${SITE_URL}/${locale}/products?productType=${productType.value}`,
    });
  }

  return items;
}

/* -------------------------------------------------------------------------- */
/*                                CATEGORY PAGE                               */
/* -------------------------------------------------------------------------- */

export function createCategoryBreadcrumb(
  locale: string,
  categoryName: string,
  categorySlug: string,
  productType?: { label: string; value: string },
): BreadcrumbItem[] {
  const items = [
    ...base(locale),
    categoriesRoot(locale),
    {
      name: categoryName,
      url: `${SITE_URL}/${locale}/${categorySlug}`,
    },
  ];

  if (productType) {
    items.push({
      name: productType.label,
      url: `${SITE_URL}/${locale}/${categorySlug}?productType=${productType.value}`,
    });
  }

  return items;
}

/* -------------------------------------------------------------------------- */
/*                                PRODUCT PAGE                                */
/* -------------------------------------------------------------------------- */

export function createProductBreadcrumb(
  locale: string,
  categoryName: string,
  categorySlug: string,
  productName: string,
  productSlug: string,
): BreadcrumbItem[] {
  return [
    ...base(locale),
    categoriesRoot(locale),
    {
      name: categoryName,
      url: `${SITE_URL}/${locale}/${categorySlug}`,
    },
    {
      name: productName,
      url: `${SITE_URL}/${locale}/${categorySlug}/${productSlug}`,
    },
  ];
}