# Epinpay - Web

Bu dokümantasyonda: 
- **Proje Yapısı ve Kurulumu**
- **Mimari Yaklaşım**
- **Proje Yapısı**
- **Yeni Sayfa/Feature/Bileşen Oluşturma Usülleri**
- **Copy Paste Hazır Kodlar**

##  Proje Yapısı ve Kurulumu
###  Tech Stack

- **Framework**: [Next.js 16.1.4](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Flowbite React Icons](https://www.npmjs.com/package/flowbite-react-icons)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Component Development**: [Storybook](https://storybook.js.org/)
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)

### Environmental Variables

.env.local :
```
```

.env.example :
```
```

### Proje Kurulumu

Önce projeyi cihazınıza klonlayın. Ardından dependiciesleri yükleyin.

```
```

## Mimari Yaklaşım
FSD kullanılmıştır.

## Proje Yapısı

```
web/
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
│   │   ├── auth/             # Auth features
│   │   ├── checkout/         # Checkout features
│   │   └── main/             # Mainpage features
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
### Bileşen Kütüphanesi & Patternlar

### Sayfalar & Feature

### SEO Yaklaşımı

### Test & Dokümantasyon

## Yeni Sayfa/Feature/Bileşen Oluşturma Usülleri

## Copy-Paste Hazır Kodlar

Epinpay Frontend Ekibi trafından hazırlanmıştır.
