"use client";

import { useRouter, useParams } from "next/navigation";

export function useProductSearch() {
  const router = useRouter();
  const params = useParams();

  const { locale, category, product } = params as {
    locale: string;
    category: string;
    product: string;
  };

  const changeVariant = (newSlug: string) => {
    router.push(`/${locale}/${category}/${newSlug}`);
  };

  const changePlatform = (id: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("platform", id.toString());
    router.push(`/${locale}/${category}/${product}?${searchParams}`);
  };

  const changeRegion = (id: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("region", id.toString());
    router.push(`/${locale}/${category}/${product}?${searchParams}`);
  };

  return {
    changeVariant,
    changePlatform,
    changeRegion,
  };
}
