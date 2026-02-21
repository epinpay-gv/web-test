  const handleVariantChange = (newSlug: string) => {
    const { locale, category } = params as {
      locale: string;
      category: string;
    };

    router.push(`/${locale}/${category}/${newSlug}`);
  };

  const handlePlatformChange = (id: number) => {
    const { locale, category, product } = params as {
      locale: string;
      category: string;
      product: string;
    };

    router.push(`/${locale}/${category}/${product}&platform=${id}`);
  };

  const handleRegionChange = (id: number) => {
    const { locale, category, product } = params as {
      locale: string;
      category: string;
      product: string;
    };

    router.push(`/${locale}/${category}/${product}&region=${id}`);
  };