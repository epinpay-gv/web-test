# Next.js E-Commerce Template

A production-ready Next.js template for building scalable e-commerce applications with TypeScript, internationalization, and modern development tools.

## 🚀 Tech Stack

- **Framework**: [Next.js 16.1.4](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Flowbite React Icons](https://www.npmjs.com/package/flowbite-react-icons)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Component Development**: [Storybook](https://storybook.js.org/)
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)

## 📁 Project Structure

```
next-ecommerce-template/
├── .flowbite-react/          # Flowbite React configuration
├── .storybook/               # Storybook configuration
├── public/                   # Static assets
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── [locale]/         # Internationalized routes
│   │   │   ├── (auth)/       # Authentication routes (login, signup)
│   │   │   ├── (private)/    # Protected routes (requires auth)
│   │   │   └── (public)/     # Public routes
│   │   ├── globals.css       # Global styles
│   │   └── layout.tsx        # Root layout
│   ├── components/           # React components
│   │   ├── common/           # Shared components (Button, Modal, etc.)
│   │   ├── layout/           # Layout components (Header, Footer)
│   │   └── user/             # User-specific components
│   ├── features/             # Feature modules
│   │   └── auth/             # Authentication feature
│   ├── hooks/                # Custom React hooks
│   ├── i18n/                 # Internationalization
│   │   ├── messages/         # Translation files (tr.json, en.json)
│   │   ├── navigation.ts     # i18n navigation
│   │   ├── request.ts        # i18n request handler
│   │   └── routing.ts        # i18n routing config
│   ├── lib/                  # Utility libraries
│   │   ├── auth.ts           # Authentication utilities
│   │   └── http.ts           # HTTP client configuration
│   ├── store/                # Zustand stores
│   ├── types/                # TypeScript type definitions
│   └── proxy.ts              # Next.js middleware for i18n
└── package.json
```

## 🏗️ Architecture Patterns

### Route Groups

This template uses Next.js route groups to organize pages by access level:

- **(auth)**: Authentication pages (login, signup) - accessible to non-authenticated users
- **(private)**: Protected pages - requires authentication
- **(public)**: Public pages - accessible to everyone

### Feature-Based Organization

Features are organized in the `features/` directory with the following structure:

```
features/
└── [feature-name]/
    ├── [feature].store.ts    # Zustand store
    ├── [feature].types.ts    # TypeScript types
    └── [feature].service.ts  # API service layer
```

### Component Organization

Components are categorized by their scope:

- **common/**: Reusable UI components (buttons, modals, inputs)
- **layout/**: Layout components (header, footer, sidebar)
- **[domain]/**: Domain-specific components (user, product, cart)

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd next-ecommerce-template
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your configuration:

   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command                   | Description                    |
| ------------------------- | ------------------------------ |
| `npm run dev`             | Start development server       |
| `npm run build`           | Build for production           |
| `npm start`               | Start production server        |
| `npm run lint`            | Run ESLint                     |
| `npm run storybook`       | Start Storybook on port 6006   |
| `npm run build-storybook` | Build Storybook for deployment |

## 🌍 Internationalization

This template supports multiple languages using `next-intl`.

### Supported Languages

- Turkish (tr) - Default
- English (en)

### Adding a New Language

1. **Add locale to routing config** (`src/i18n/routing.ts`):

   ```typescript
   export const routing = defineRouting({
     locales: ["tr", "en", "de"], // Add new locale
     defaultLocale: "tr",
   });
   ```

2. **Create translation file** (`src/i18n/messages/de.json`):
   ```json
   {
     "HomePage": {
       "title": "Hallo Welt",
       "description": "Mehrsprachige Unterstützung mit Next.js"
     }
   }
   ```

### Using Translations

```typescript
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('HomePage');

  return <h1>{t('title')}</h1>;
}
```

## 🎨 Styling Guide

### Tailwind CSS

This project uses Tailwind CSS 4 with custom configuration.

```tsx
<div className="bg-background text-foreground p-4">Content</div>
```

### Flowbite React Components

Use pre-built Flowbite components:

```tsx
import { Button } from "flowbite-react";

<Button color="primary">Click me</Button>;
```

### Dark Mode

Dark mode is automatically handled via CSS variables and `prefers-color-scheme`.

## 🔐 Authentication

The template includes a basic authentication structure:

- Login page: `/[locale]/login`
- Signup page: `/[locale]/signup`
- Protected routes in `(private)` group

**Note**: Authentication logic needs to be implemented in `src/lib/auth.ts` based on your backend.

## 📦 State Management

This template uses Zustand for state management.

### Creating a Store

```typescript
// src/store/cartStore.ts
import { create } from "zustand";

interface CartState {
  items: any[];
  addItem: (item: any) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
}));
```

### Using a Store

```typescript
import { useCartStore } from '@/store/cartStore';

export default function Cart() {
  const { items, addItem } = useCartStore();

  return <div>Items: {items.length}</div>;
}
```

## 🔍 SEO & Metadata

This template includes a comprehensive SEO implementation with Next.js Metadata API and JSON-LD structured data.

### Features

- ✅ Dynamic metadata generation
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card support
- ✅ JSON-LD structured data (Organization, Article, Product, Breadcrumb)
- ✅ Multi-language hreflang tags
- ✅ Canonical URLs
- ✅ Search engine verification (Google, Yandex)

### Quick Start

**1. Set environment variables** (`.env.local`):

```env
NEXT_PUBLIC_APP_URL=https://yoursite.com
NEXT_PUBLIC_APP_NAME="Your Company Name"
NEXT_PUBLIC_CDN_URL=https://cdn.yoursite.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_code
NEXT_PUBLIC_YANDEX_VERIFICATION=your_yandex_code
```

**2. Use in your pages**:

```typescript
// src/app/[locale]/products/[slug]/page.tsx
import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await fetchProduct(slug);

  return generateSEOMetadata({
    data: {
      meta_title: product.title,
      name: product.name,
      meta_desc: product.description,
      img: product.image,
    },
    locale,
    pathname: `/${locale}/products/${slug}`,
  });
}
```

**3. Add JSON-LD schemas**:

```typescript
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/seo';

export default function ProductPage({ product }) {
  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description,
    image: product.image,
    price: product.price,
    currency: 'USD',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Your content */}
    </>
  );
}
```

### Available SEO Utilities

| Function                       | Purpose                           |
| ------------------------------ | --------------------------------- |
| `generateSEOMetadata()`        | Generate complete metadata object |
| `generateBreadcrumbSchema()`   | Breadcrumb navigation schema      |
| `generateArticleSchema()`      | Article/blog post schema          |
| `generateProductSchema()`      | E-commerce product schema         |
| `generateOrganizationSchema()` | Organization/company schema       |

### Documentation

For complete examples and advanced usage, see **[`src/lib/SEO_USAGE.md`](src/lib/SEO_USAGE.md)**

### Testing Your SEO

- **Google Rich Results**: https://search.google.com/test/rich-results
- **Schema Validator**: https://validator.schema.org/
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/

## 🧪 Testing

### Running Tests

```bash
npm run test        # Run unit tests
npm run test:e2e    # Run E2E tests
```

### Writing Tests

- Unit tests: Use Vitest
- Component tests: Use Vitest + React Testing Library
- E2E tests: Use Playwright

## 📖 Storybook

Develop and document components in isolation.

```bash
npm run storybook
```

Visit [http://localhost:6006](http://localhost:6006)

### Creating Stories

```tsx
// src/components/common/Button/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button",
  },
};
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Node.js.

## 🔧 Configuration Files

| File                          | Purpose                      |
| ----------------------------- | ---------------------------- |
| `next.config.ts`              | Next.js configuration        |
| `tsconfig.json`               | TypeScript configuration     |
| `tailwind.config.js`          | Tailwind CSS configuration   |
| `eslint.config.mjs`           | ESLint configuration         |
| `.flowbite-react/config.json` | Flowbite React configuration |

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow ESLint rules
- Use functional components with hooks
- Prefer named exports over default exports for components

### File Naming

- Components: PascalCase (`Button.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Types: PascalCase (`User.ts`)
- Stores: camelCase with suffix (`userStore.ts`)

### Import Aliases

Use the `@/` alias for imports:

```typescript
import { Button } from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
```

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run linting and tests
4. Submit a pull request

## 📄 License

This template is proprietary and for internal company use only.

## 🆘 Support

For questions or issues, contact the frontend team lead or create an issue in the repository.

---

**Happy coding! 🎉**
