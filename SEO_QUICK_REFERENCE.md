# SEO Implementation 

Bu doküman, projede uygulanan **SEO mimarisinin tamamını** ve **neden bu şekilde kurgulandığını** açıklar. Amaç: SEO yüzünden mimarinin bozulmasını engellemek, ölçeklenebilir ve güvenli bir yapı kurmak.

---

## 🎯 Genel Yaklaşım

Bu projede SEO şu prensiplerle ele alındı:

* **Metadata (head)** ve **Schema (JSON-LD)** kesin olarak ayrıldı
* Global, statik ve dinamik sayfalar net biçimde ayrıştırıldı
* i18n (çok dilli yapı) SEO’nun bir parçası olarak ele alındı
* Canonical, hreflang ve sitemap otomatik çalışacak şekilde kuruldu
* Sayfa dosyaları minimum sorumlulukla bırakıldı

> SEO, UI mantığının içine gömülmedi. Ayrı bir katman olarak ele alındı.

---

## 📁 Dosya ve Klasör Yapısı (SEO ile İlgili)

```txt
src/
├─ app/
│  ├─ layout.tsx            # Global SEO (metadata + scriptler)
│  ├─ sitemap.ts            # Tüm site için sitemap
│  └─ [locale]/
│     └─ (public)/
│        ├─ categories/
│        │  └─ page.tsx     # Statik kategori liste sayfası
│        └─ [category]/
│           └─ page.tsx     # Dinamik kategori detay sayfası
│
├─ lib/
│  └─ seo.ts                # createSeo helper fonksiyonu
│
└─ components/
   └─ seo/
      ├─ CategorySchema.tsx
      └─ BreadcrumbSchema.tsx
```

---

## 🌍 Global SEO (`app/layout.tsx`)

### Bu dosya ne yapar?

* Site genelinde geçerli olan **metadata**’yı tanımlar
* Google Tag Manager ekler
* Organization & Website schema’larını **1 kere** render eder

### Burada neler vardır?

* `title.template`
* `description`
* `robots`
* `openGraph`
* `twitter`
* GTM scriptleri
* Organization & WebSite schema (JSON-LD)

> ❗ Bu dosyada **sayfa bazlı SEO yapılmaz**.

---

## 🧠 Metadata Yönetimi (`lib/seo.ts`)

### Amaç

Tek tek her sayfada metadata yazmamak, tutarlı bir yapı oluşturmak.

### Kullanım Mantığı

* `createSeo()` fonksiyonu
* Statik veya dinamik parametre alabilir
* Canonical ve hreflang otomatik üretilir

### Metadata neleri kapsar?

* title
* description
* canonical
* alternates (hreflang)
* openGraph

> Metadata = **tarayıcı & arama motoru head bilgisi**

---

## 🔗 Canonical & Hreflang

### Canonical

* Her sayfa **tek bir ana URL** belirtir
* Duplicate content riskini engeller

### Hreflang

* `[locale]` segmenti üzerinden otomatik çalışır
* Aynı içeriğin farklı dillerini Google’a bildirir

Bu yapı **zaten mimarinin içine gömülüdür**, ekstra bir işlem gerekmez.

---

## 🗺 Sitemap (`app/sitemap.ts`)

### Özellikler

* Next.js native sitemap kullanılır
* Locale bazlı URL’ler üretilebilir
* Statik ve dinamik route’lar ayrıdır

### Ne içerir?

* `/categories`
* `/[category]`
* diğer public sayfalar

> Sitemap fetch veya feature klasörleriyle **bağlantılı değildir**.

---

## 🧩 Schema (JSON-LD) Yapısı

### Neden ayrı bileşenler?

* Page logic ile karışmaması için
* Tekrar kullanılabilirlik
* SEO regression riskini azaltmak

### Nerede?

```txt
components/seo/
├─ CategorySchema.tsx
├─ BreadcrumbSchema.tsx
```

### Nasıl kullanılır?

```tsx
<CategorySchema />
<BreadcrumbSchema />
```

> Schema = **Google’a içeriğin ne olduğunu anlatır**

Metadata’dan tamamen bağımsızdır.

---

## 📄 Statik vs Dinamik Sayfa SEO

### Statik Sayfa (`/categories`)

* `metadata` sabittir
* Sitemap’te tek URL vardır
* Schema statik içerik anlatır

### Dinamik Sayfa (`/[category]`)

* `generateMetadata` kullanılır
* URL parametresine göre metadata üretilir
* Schema props alarak render edilir

> İstek atılmıyor olsa bile yapı buna hazırdır.

---

## 🚫 Bilinçli Olarak Yapılmayanlar

* Schema’ları `seo.ts` içine gömmek ❌
* Feature klasörlerinden sitemap üretmek ❌
* SEO için API fetch zorunluluğu ❌
* Page dosyalarını şişirmek ❌

---

## ✅ Sonuç

Bu SEO mimarisi:

* Çok dilli yapıyı destekler
* Next.js App Router’a %100 uygundur
* Büyüdükçe bozulmaz
* SEO değişikliklerinin UI’yı kırmasını engeller

Bu noktadan sonra eklenecek her şey:

* yeni schema bileşeni
* yeni sitemap entry
* yeni metadata konfigürasyonu

şeklinde **lokal ve güvenli** ilerler.
