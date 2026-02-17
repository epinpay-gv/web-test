import { BlogListItem } from "@/features/blog/types";

/**
 * Tüm blog liste verisi tek kaynaktan beslenir.
 * Service katmanı buradan slice / sort işlemleri yapar.
 */
export const mockBlogs: BlogListItem[] = [
  {
    id: "1",
    slug: "en-iyi-pc-simulasyon-oyunlari-2025",
    title: "En İyi 15 PC Simülasyon Oyunu (2025)",
    description:
      "En iyi PC simülasyon oyunlarını keşfedin. Gerçekçilik, grafik ve oynanış açısından en başarılı 15 simülasyon oyunu burada.",
    coverImage: "/images/blog/simulasyon-1.jpg",
    createdAt: "2026-03-02",
    viewCount: 1250,
  },
  {
    id: "2",
    slug: "en-iyi-aksiyon-oyunlari-2025",
    title: "En İyi 10 Aksiyon Oyunu (2025)",
    description:
      "2025’in en iyi aksiyon oyunlarını listeledik. Tempolu ve sürükleyici deneyimler burada.",
    coverImage: "/images/blog/aksiyon-1.jpg",
    createdAt: "2026-02-20",
    viewCount: 980,
  },
  {
    id: "3",
    slug: "en-iyi-strateji-oyunlari-2025",
    title: "En İyi 12 Strateji Oyunu (2025)",
    description:
      "Gerçek zamanlı ve sıra tabanlı en iyi strateji oyunlarını keşfedin.",
    coverImage: "/images/blog/strateji-1.jpg",
    createdAt: "2026-02-10",
    viewCount: 1430,
  },
  {
    id: "4",
    slug: "en-iyi-korku-oyunlari-2025",
    title: "En İyi 8 Korku Oyunu (2025)",
    description:
      "Karanlık atmosferi ve gerilim dolu anlarıyla en iyi korku oyunları.",
    coverImage: "/images/blog/korku-1.jpg",
    createdAt: "2026-01-28",
    viewCount: 870,
  },
  {
    id: "5",
    slug: "en-iyi-survival-oyunlari-2025",
    title: "En İyi 10 Survival Oyunu (2025)",
    description:
      "Hayatta kalma mücadelesi veren en başarılı survival oyunları.",
    coverImage: "/images/blog/survival-1.jpg",
    createdAt: "2026-01-15",
    viewCount: 1120,
  },
  {
    id: "6",
    slug: "en-iyi-rpg-oyunlari-2025",
    title: "En İyi 10 RPG Oyunu (2025)",
    description:
      "Rol yapma türünde öne çıkan en iyi RPG oyunları.",
    coverImage: "/images/blog/rpg-1.jpg",
    createdAt: "2026-01-05",
    viewCount: 1600,
  },
  {
    id: "7",
    slug: "en-iyi-yaris-oyunlari-2025",
    title: "En İyi 7 Yarış Oyunu (2025)",
    description:
      "Gerçekçi sürüş deneyimi sunan en iyi yarış oyunları.",
    coverImage: "/images/blog/yaris-1.jpg",
    createdAt: "2025-12-22",
    viewCount: 760,
  },
  {
    id: "8",
    slug: "en-iyi-macera-oyunlari-2025",
    title: "En İyi 9 Macera Oyunu (2025)",
    description:
      "Hikaye odaklı ve sürükleyici macera oyunları listesi.",
    coverImage: "/images/blog/macera-1.jpg",
    createdAt: "2025-12-10",
    viewCount: 1320,
  },
];
