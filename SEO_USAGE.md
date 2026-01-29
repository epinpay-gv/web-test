# SEO Implementation Guide

This guide shows how to implement SEO metadata in your Next.js pages using the utilities in `seo.ts`.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Dynamic Metadata with API Data](#dynamic-metadata-with-api-data)
- [Layout Metadata](#layout-metadata)
- [JSON-LD Structured Data](#json-ld-structured-data)
- [Product Pages](#product-pages)
- [Complete Examples](#complete-examples)

---

## Basic Usage

### Static Metadata

For simple pages with static content:

```typescript
// src/app/[locale]/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
  openGraph: {
    title: 'About Us',
    description: 'Learn more about our company',
    images: ['/images/about-og.jpg'],
  },
};

export default function AboutPage() {
  return <div>About content</div>;
}
```

---

## Dynamic Metadata with API Data

### Example 1: Product Page

```typescript
// src/app/[locale]/products/[slug]/page.tsx
import { Metadata } from 'next';
import { generateSEOMetadata, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Fetch product data
async function getProduct(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  return res.json();
}

// Generate dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct(slug);

  return generateSEOMetadata({
    data: {
      meta_title: product.title,
      name: product.name,
      meta_desc: product.description,
      img: product.image,
      img_alt: product.imageAlt,
      created_at: product.createdAt,
      updated_at: product.updatedAt,
    },
    locale,
    pathname: `/${locale}/products/${slug}`,
  });
}

// Page component
export default async function ProductPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const product = await getProduct(slug);

  // Generate JSON-LD schemas
  const articleSchema = generateArticleSchema(
    {
      name: product.name,
      meta_desc: product.description,
      img: product.image,
      img_alt: product.imageAlt,
      created_at: product.createdAt,
      updated_at: product.updatedAt,
    },
    locale,
    `/${locale}/products/${slug}`
  );

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/products' },
      { name: product.name, url: `/products/${slug}` },
    ],
    locale
  );

  return (
    <>
      {/* JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page content */}
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
    </>
  );
}
```

### Example 2: Blog Post

```typescript
// src/app/[locale]/blog/[slug]/page.tsx
import { Metadata } from 'next';
import { generateSEOMetadata, generateArticleSchema } from '@/lib/seo';

interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  publishedAt: string;
  updatedAt: string;
}

async function getBlogPost(slug: string): Promise<BlogPost> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`);
  return res.json();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);

  return generateSEOMetadata({
    data: {
      meta_title: post.title,
      name: post.title,
      meta_desc: post.excerpt,
      img: post.featuredImage,
      created_at: post.publishedAt,
      updated_at: post.updatedAt,
    },
    locale,
    pathname: `/${locale}/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);

  const articleSchema = generateArticleSchema(
    {
      name: post.title,
      meta_desc: post.excerpt,
      img: post.featuredImage,
      created_at: post.publishedAt,
      updated_at: post.updatedAt,
    },
    locale,
    `/${locale}/blog/${slug}`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
}
```

---

## Layout Metadata

### Root Layout with Global SEO

```typescript
// src/app/[locale]/layout.tsx
import { Metadata } from 'next';
import { generateOrganizationSchema } from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    title: {
      default: 'My E-Commerce Site',
      template: '%s | My E-Commerce Site', // Page title | Site name
    },
    description: 'Your one-stop shop for amazing products',
    keywords: ['ecommerce', 'shopping', 'online store', 'products'],
    authors: [{ name: 'Your Company' }],
    creator: 'Your Company',
    publisher: 'Your Company',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      siteName: 'My E-Commerce Site',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@yourhandle',
      site: '@yourhandle',
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Organization schema for the entire site
  const organizationSchema = generateOrganizationSchema([
    'https://www.instagram.com/yourcompany',
    'https://www.facebook.com/yourcompany',
    'https://twitter.com/yourcompany',
    'https://www.linkedin.com/company/yourcompany',
  ]);

  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## JSON-LD Structured Data

### Breadcrumb Navigation

```typescript
import { generateBreadcrumbSchema } from '@/lib/seo';

const breadcrumbSchema = generateBreadcrumbSchema(
  [
    { name: 'Home', url: '/' },
    { name: 'Category', url: '/category' },
    { name: 'Subcategory', url: '/category/subcategory' },
    { name: 'Product', url: '/category/subcategory/product' },
  ],
  locale
);

// In your component
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
/>
```

### Article Schema

```typescript
import { generateArticleSchema } from "@/lib/seo";

const articleSchema = generateArticleSchema(
  {
    name: "Article Title",
    meta_desc: "Article description",
    img: "/images/article.jpg",
    img_alt: "Article image",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  locale,
  pathname,
);
```

### Product Schema

```typescript
import { generateProductSchema } from '@/lib/seo';

const productSchema = generateProductSchema({
  name: 'Product Name',
  description: 'Product description',
  image: 'https://example.com/product.jpg',
  price: 99.99,
  currency: 'USD',
  sku: 'PROD-123',
  brand: 'Your Brand',
  availability: 'InStock',
});

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
/>
```

---

## Product Pages

### E-commerce Product with Full SEO

```typescript
// src/app/[locale]/products/[slug]/page.tsx
import { Metadata } from 'next';
import { generateSEOMetadata, generateProductSchema, generateBreadcrumbSchema } from '@/lib/seo';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  sku: string;
  brand: string;
  inStock: boolean;
  category: string;
}

async function getProduct(slug: string): Promise<Product> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`);
  return res.json();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct(slug);

  return generateSEOMetadata({
    data: {
      meta_title: `${product.name} - Buy Online`,
      name: product.name,
      meta_desc: product.description,
      img: product.image,
    },
    locale,
    pathname: `/${locale}/products/${slug}`,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const product = await getProduct(slug);

  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description,
    image: product.image,
    price: product.price,
    currency: product.currency,
    sku: product.sku,
    brand: product.brand,
    availability: product.inStock ? 'InStock' : 'OutOfStock',
  });

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/products' },
      { name: product.category, url: `/products?category=${product.category}` },
      { name: product.name, url: `/products/${slug}` },
    ],
    locale
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: {product.price} {product.currency}</p>
        <button>Add to Cart</button>
      </div>
    </>
  );
}
```

---

## Environment Variables

Make sure these are set in your `.env.local`:

```bash
NEXT_PUBLIC_APP_URL=https://yoursite.com
NEXT_PUBLIC_APP_NAME="Your Company Name"
NEXT_PUBLIC_CDN_URL=https://cdn.yoursite.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_code
NEXT_PUBLIC_YANDEX_VERIFICATION=your_yandex_code
```

---

## Best Practices

1. **Always use `generateMetadata`** for dynamic pages
2. **Include JSON-LD schemas** for better search engine understanding
3. **Use breadcrumbs** on all deep pages
4. **Set proper image alt texts** for accessibility and SEO
5. **Keep descriptions between 150-160 characters**
6. **Use unique titles** for each page
7. **Include Open Graph tags** for social media sharing
8. **Add canonical URLs** to avoid duplicate content issues

---

## Testing Your SEO

Use these tools to validate your implementation:

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator

---

## Migration from Nuxt

| Nuxt 3                | Next.js 16                                                 |
| --------------------- | ---------------------------------------------------------- |
| `useHead()`           | `export const metadata` or `generateMetadata()`            |
| `useSeoMeta()`        | `Metadata` object                                          |
| `definePageMeta()`    | `generateMetadata()`                                       |
| `useServerSeoMeta()`  | Same as client (all metadata is server-side)               |
| Script in `useHead()` | `<script>` tag in component with `dangerouslySetInnerHTML` |

---

**Need help?** Check the [Next.js Metadata documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
