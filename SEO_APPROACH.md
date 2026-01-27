# SEO Yaklaşımı

Bu belge Epinpay web projesinde kullanılan SEO yaklaşımını, yeni bir ekleme yapılacağı zaman nasıl yapılacağını ve dikkat edilmesi gerekn konuları içermektedir.

## Table of Contents

- [Basit Kullanım](#basic-usage)
    - [Projenin Mevcut Yapısı](#)
        - [Core SEO Kütüphanesi](#core-seo)
        - [Global SEO Ayarları](#global-seo)
        - [Layout Metadata](#layout-metadata)
        - [JSON-LD Structured Data](#json-ld-structured-data)
- [Kullanım Kılavuzu](#how-to-use-it)
    - [Tamamlanmış Örnekler](#complete-examples)
        - [Tamamlanmış Örnekler](#complete-examples)

- [Önemli Noktalar](#warning)

---
## 1. **Basit Kullanım** 

Proje çeşitli metadata ekleme opsiyonları içermektedir:

- `Statik : ` - Full metadata generation with Open Graph, Twitter Cards, hreflang
- `Dinamik :` - Breadcrumb navigation JSON-LD

### Nuxt vs Next.js: 

| Feature        | Nuxt 3                | Next.js 16 (This Template)         |
| -------------- | --------------------- | ---------------------------------- |
| Meta Tags      | `useHead()`           | `generateMetadata()` ✅            |
| Dynamic Meta   | `useSeoMeta()`        | `generateMetadata()` ✅            |
| JSON-LD        | Script in `useHead()` | Helper functions + `<script>` ✅   |
| Hreflang       | Manual in `useHead()` | `metadata.alternates.languages` ✅ |
| Open Graph     | Manual in `useHead()` | `metadata.openGraph` ✅            |
| Twitter Cards  | Manual in `useHead()` | `metadata.twitter` ✅              |
| Canonical URL  | Manual link tag       | `metadata.alternates.canonical` ✅ |
| Breadcrumbs    | Custom schema         | `generateBreadcrumbSchema()` ✅    |
| Organization   | Custom schema         | `generateOrganizationSchema()` ✅  |
| Product Schema | Custom schema         | `generateProductSchema()` ✅       |

## 🎯 Key Differences from Nuxt

### Nuxt 3 Approach

```javascript
// Nuxt composable
export default function (data) {
  return useHead({
    title: data?.meta_title,
    meta: [
      { name: "description", content: data?.meta_desc },
      { property: "og:title", content: data?.meta_title },
    ],
    link: [{ rel: "canonical", href: `${config.public.siteURL}${route.path}` }],
  });
}
```

### Next.js 16 Approach (This Template)

```typescript
// Next.js Metadata API
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = await fetchData(slug);

  return generateSEOMetadata({
    data: {
      meta_title: data.title,
      meta_desc: data.description,
      img: data.image,
    },
    locale,
    pathname: `/${locale}/${slug}`,
  });
}
```

## 2. **Core SEO Library** (`src/lib/seo.ts`)

Complete SEO utility functions for Next.js:

- `generateSEOMetadata()` - Full metadata generation with Open Graph, Twitter Cards, hreflang
- `generateBreadcrumbSchema()` - Breadcrumb navigation JSON-LD
- `generateArticleSchema()` - Article/blog post JSON-LD
- `generateProductSchema()` - E-commerce product JSON-LD
- `generateOrganizationSchema()` - Company/organization JSON-LD

## 3. **Global SEO Setup** (`src/app/[locale]/layout.tsx`)

- Site-wide metadata configuration
- Organization schema in root layout
- Multi-language support (TR/EN)
- Search engine verification (Google, Yandex)
- Open Graph and Twitter Card defaults
- Robots meta tags

### 4. **Layout Metadata**

```typescript

```
### 5. *JSON-LD Structured Data**

```typescript

```
### 6. **Kullanım Kılavuzu**

Yeni bir metadata ekleme adımları şu şekildedir:


```typescript

```

### 4. **Environment Variables** (`.env.example`)

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="E-Commerce App"
NEXT_PUBLIC_CDN_URL=https://cdn.example.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_verification_code
NEXT_PUBLIC_YANDEX_VERIFICATION=your_yandex_verification_code
```

## 📋 Features Comparison: Nuxt vs Next.js





## 🚀 Next Steps for Your Team

### 1. **Configure Environment**

Copy `.env.example` to `.env.local` and fill in your values:

- Site URL
- Company name
- CDN URL (if using)
- Verification codes

### 2. **Customize Organization Schema**

Edit `src/app/[locale]/layout.tsx` and add your social media links:

```typescript
const organizationSchema = generateOrganizationSchema([
  "https://www.instagram.com/yourcompany",
  "https://www.facebook.com/yourcompany",
  "https://twitter.com/yourcompany",
]);
```

### 3. **Implement in Pages**

Use the examples in `SEO_QUICK_REFERENCE.md` for:

- Product pages
- Blog posts
- Category pages
- Static pages

### 4. **Test Your Implementation**

- Google Rich Results Test
- Schema.org Validator
- Facebook Sharing Debugger
- Twitter Card Validator

## 📚 Documentation Files

1. **`src/lib/seo.ts`** - Core library (don't modify unless needed)
2. **`src/lib/SEO_USAGE.md`** - Detailed guide with all examples
3. **`SEO_QUICK_REFERENCE.md`** - Quick copy-paste examples
4. **`README.md`** - Project overview with SEO section

## 💡 Tips for Your Team

1. **Always use `generateMetadata`** for dynamic pages
2. **Include JSON-LD schemas** for better search visibility
3. **Test on staging** before deploying to production
4. **Keep descriptions 150-160 characters** for optimal display
5. **Use 1200x630px images** for Open Graph
6. **Add breadcrumbs** on all deep pages
7. **Update sitemap** when adding new pages

## 🔍 SEO Checklist for New Pages

- [ ] `generateMetadata()` function implemented
- [ ] Title is unique and descriptive
- [ ] Description is 150-160 characters
- [ ] Open Graph image is set
- [ ] Appropriate JSON-LD schema added
- [ ] Breadcrumbs included (if applicable)
- [ ] Tested with Google Rich Results
- [ ] Tested social sharing preview

## 🆘 Common Issues & Solutions

### Issue: Metadata not showing

**Solution**: Make sure `generateMetadata` is exported and async

### Issue: JSON-LD errors

**Solution**: Validate at schema.org/validator

### Issue: Wrong language in search results

**Solution**: Check hreflang tags and locale settings

### Issue: Images not showing in social preview

**Solution**: Ensure images are absolute URLs and 1200x630px

---

Epinpay Frontend Ekibi.
