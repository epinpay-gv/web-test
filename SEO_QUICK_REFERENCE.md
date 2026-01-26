# SEO Quick Reference

Quick copy-paste examples for common SEO scenarios.

## 📄 Static Page

```typescript
// src/app/[locale]/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
};

export default function AboutPage() {
  return <div>About content</div>;
}
```

## 🛍️ Product Page

```typescript
// src/app/[locale]/products/[slug]/page.tsx
import { Metadata } from 'next';
import { generateSEOMetadata, generateProductSchema } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

async function getProduct(slug: string) {
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
    currency: 'USD',
    sku: product.sku,
    availability: 'InStock',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
    </>
  );
}
```

## 📝 Blog Post

```typescript
// src/app/[locale]/blog/[slug]/page.tsx
import { Metadata } from 'next';
import { generateSEOMetadata, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo';

async function getBlogPost(slug: string) {
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

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: post.title, url: `/blog/${slug}` },
    ],
    locale
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
}
```

## 🏠 Layout with Organization Schema

```typescript
// src/app/[locale]/layout.tsx
import { Metadata } from 'next';
import { generateOrganizationSchema } from '@/lib/seo';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: 'My Site',
      template: '%s | My Site',
    },
    description: 'Site description',
    openGraph: {
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
    },
  };
}

export default function Layout({ children }) {
  const organizationSchema = generateOrganizationSchema([
    'https://www.instagram.com/yourcompany',
    'https://www.facebook.com/yourcompany',
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

## 🔧 Environment Variables

```env
NEXT_PUBLIC_APP_URL=https://yoursite.com
NEXT_PUBLIC_APP_NAME="Your Company"
NEXT_PUBLIC_CDN_URL=https://cdn.yoursite.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_code
NEXT_PUBLIC_YANDEX_VERIFICATION=your_code
```

## 📊 Testing Checklist

- [ ] Title appears correctly in browser tab
- [ ] Description is 150-160 characters
- [ ] Open Graph image is 1200x630px
- [ ] Canonical URL is correct
- [ ] Hreflang tags for all languages
- [ ] JSON-LD validates at schema.org
- [ ] Google Rich Results test passes
- [ ] Facebook sharing preview looks good
- [ ] Twitter card preview looks good

## 🔗 Useful Links

- [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
