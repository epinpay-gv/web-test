import { Metadata } from 'next';
import { generateSEOMetadata, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo';

// Section 1 - Page Props : Define page props
interface PageProps {
    params: Promise<{ locale: string; slug: string }>;
}

// Section 2 - Metadata : Generate dynamic metadata
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

// Section 3 - Page component : Generate JSON-LD schemas and render page
export default async function CategoriesPage({params}: PageProps) {
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
        CATEGORIES
      </div>
    </>
  );
}
