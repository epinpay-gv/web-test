import { Metadata } from "next";

export interface SEOData {
  meta_title?: string;
  name?: string;
  meta_desc?: string;
  img?: string;
  img_alt?: string;
  created_at?: string;
  updated_at?: string;
  language_id?: number;
  path?: Array<{ name: string; url: string }>;
}

interface GenerateMetadataParams {
  data: SEOData;
  locale: string;
  pathname: string;
}

/**
 * Generate Next.js metadata for SEO
 * This replaces Nuxt's useHead composable
 */
export function generateSEOMetadata({
  data,
  locale,
  pathname,
}: GenerateMetadataParams): Metadata {
  const siteURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const cdnURL = process.env.NEXT_PUBLIC_CDN_URL || siteURL;

  const title = data?.meta_title || data?.name || "Default Title";
  const description = data?.meta_desc || "Default description";

  // Clean path for hreflang (remove locale prefix)
  const cleanPath = pathname.replace(/^\/(tr|en)/, "") || "/";
  const trUrl = `${siteURL}${cleanPath}`;
  const enUrl = `${siteURL}/en${cleanPath}`;
  const currentUrl = `${siteURL}${pathname}`;

  // Image URL
  const imageUrl = data?.img
    ? `${cdnURL}/image${data.img}`
    : `${siteURL}/og-image.jpg`;

  return {
    title,
    description,

    // Open Graph
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: process.env.NEXT_PUBLIC_APP_NAME || "E-Commerce App",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data?.img_alt || title,
        },
      ],
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },

    // Canonical and alternates
    alternates: {
      canonical: currentUrl,
      languages: {
        tr: trUrl,
        en: enUrl,
        "x-default": trUrl,
      },
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Additional meta tags (only include if data exists)
    ...(data?.created_at || data?.updated_at
      ? {
          other: {
            ...(data?.created_at && {
              "article:published_time": data.created_at,
            }),
            ...(data?.updated_at && {
              "article:modified_time": data.updated_at,
            }),
          },
        }
      : {}),
  };
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>,
  locale: string,
) {
  const siteURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteURL}/${locale}${item.url}`,
    })),
  };
}

/**
 * Generate JSON-LD structured data for articles
 */
export function generateArticleSchema(
  data: SEOData,
  locale: string,
  pathname: string,
) {
  const siteURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const cdnURL = process.env.NEXT_PUBLIC_CDN_URL || siteURL;
  const languageName = locale === "tr" ? "tr" : "en";

  // Replace with your company info
  const organizationName = process.env.NEXT_PUBLIC_APP_NAME || "Your Company";
  const organizationUrl = siteURL;
  const organizationLogo = `${siteURL}/logo.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    description: data?.meta_desc,
    headline: data?.name,
    name: data?.name,
    datePublished: data?.created_at,
    dateModified: data?.updated_at,
    mainEntityOfPage: `${siteURL}${pathname}`,
    inLanguage: languageName,
    author: {
      "@type": "Organization",
      name: organizationName,
      url: organizationUrl,
    },
    publisher: {
      "@type": "Organization",
      name: organizationName,
      url: organizationUrl,
      logo: {
        "@type": "ImageObject",
        url: organizationLogo,
        width: 300,
        height: 300,
      },
    },
    image: {
      "@type": "ImageObject",
      url: data?.img ? `${cdnURL}/images/${data.img}` : organizationLogo,
      caption: data?.img_alt,
      inLanguage: languageName,
    },
  };
}

/**
 * Generate JSON-LD structured data for products (e-commerce)
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  sku?: string;
  brand?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
}) {
  const siteURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand || process.env.NEXT_PUBLIC_APP_NAME,
    },
    offers: {
      "@type": "Offer",
      url: siteURL,
      priceCurrency: product.currency,
      price: product.price,
      availability: `https://schema.org/${product.availability || "InStock"}`,
    },
  };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema(socialLinks?: string[]) {
  const siteURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const organizationName = process.env.NEXT_PUBLIC_APP_NAME || "Your Company";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organizationName,
    url: siteURL,
    logo: `${siteURL}/logo.png`,
    sameAs: socialLinks || [],
  };
}
