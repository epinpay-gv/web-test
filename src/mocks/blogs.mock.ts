import { BlogCard, BlogDetail, BlogListPageData, BlogPopularItem } from "@/features/blog/blog.types";

//  Helper

const createBlogCard = (
  id: number,
  title: string,
  description: string = "En iyi PC simülasyon oyunlarını keşfedin! Gerçekçilik, grafik ve oynanış açısından en başarılı 15 simülasyon oyununu anlattık. Hemen göz atın!",
  publishedAt: string = "2025-02-03",
  thumbnail: string = "/image/blog/featuredcard-mock-img.png"
): BlogCard => ({
  id,
  slug: `blog-${id}`,
  locale: "tr",
  title,
  description,
  thumbnail,
  publishedAt,
  viewCount: 1000 + id * 245,
});

// Hero 

const heroFeatured = createBlogCard(
  1,
  "En İyi 15 PC Simülasyon Oyunu (2025)",
  "Simülasyon oyunları, oyunculara gerçek hayatta deneyimleyemeyecekleri senaryolar sunan türlerin başında geliyor. En iyilerini derledik!",
  "2025-02-03",
  "/image/blog/featuredcard-mock-img.png"
);

const heroSide: BlogCard[] = [
  {
    id: 2,
    slug: "en-iyi-strateji-oyunlari-2025",
    locale: "tr",
    title: "En İyi 10 Strateji Oyunu (2025)",
    description: "En iyi strateji oyunlarını keşfedin!",
    publishedAt: "2025-02-03",
    thumbnail: "/image/blog/items-card.png",
    viewCount: 1490,
  },
  {
    id: 3,
    slug: "en-iyi-rpg-oyunlari-2025",
    locale: "tr",
    title: "En İyi RPG Oyunları (2025)",
    description: "En iyi RPG oyunlarını keşfedin!",
    publishedAt: "2025-03-01",
    thumbnail: "/image/blog/items-card.png",
    viewCount: 1735,
  },
  {
    id: 4,
    slug: "en-iyi-acik-dunya-oyunlari-2025",
    locale: "tr",
    title: "En İyi Açık Dünya Oyunları (2025)",
    description: "En iyi açık dünya oyunlarını keşfedin!",
    publishedAt: "2025-03-15",
    thumbnail: "/image/blog/items-card.png",
    viewCount: 1980,
  },
];

// Popular 

const popularList: BlogPopularItem[] = [
  {
    id: 1,
    slug: "en-iyi-pc-simulasyon-oyunlari-2025",
    locale: "tr",
    title: "En İyi 15 PC Simülasyon Oyunu (2025)",
    publishedAt: "2025-02-03",
    thumbnail: "/image/blog/items-card.png",
    rank: 1,
  },
  {
    id: 2,
    slug: "en-iyi-strateji-oyunlari-2025",
    locale: "tr",
    title: "En İyi 10 Strateji Oyunu (2025)",
    publishedAt: "2025-02-10",
    thumbnail: "/image/blog/items-card.png",
    rank: 2,
  },
  {
    id: 3,
    slug: "en-iyi-rpg-oyunlari-2025",
    locale: "tr",
    title: "En İyi RPG Oyunları (2025)",
    publishedAt: "2025-02-18",
    thumbnail: "/image/blog/items-card.png",
    rank: 3,
  },
  {
    id: 4,
    slug: "en-iyi-acik-dunya-oyunlari-2025",
    locale: "tr",
    title: "En İyi Açık Dünya Oyunları (2025)",
    publishedAt: "2025-03-01",
    thumbnail: "/image/blog/items-card.png",
    rank: 4,
  },
  {
    id: 5,
    slug: "en-iyi-korku-oyunlari-2025",
    locale: "tr",
    title: "En İyi Korku Oyunları (2025)",
    publishedAt: "2025-03-10",
    thumbnail: "/image/blog/items-card.png",
    rank: 5,
  },
  {
    id: 6,
    slug: "en-iyi-aksiyon-oyunlari-2025",
    locale: "tr",
    title: "En İyi 10 Aksiyon Oyunu (2025)",
    publishedAt: "2025-04-10",
    thumbnail: "/image/blog/items-card.png",
    rank: 6,
  },
];

// Grid

const gridTitles = [
  "En İyi 15 PC Simülasyon Oyunu (2025)",
  "En İyi 10 Strateji Oyunu (2025)",
  "En İyi RPG Oyunları (2025)",
  "En İyi Açık Dünya Oyunları (2025)",
  "En İyi Korku Oyunları (2025)",
  "En İyi 10 Aksiyon Oyunu (2025)",
  "En İyi Spor Oyunları (2025)",
  "En İyi Bağımsız Oyunlar (2025)",
];

const gridBlogs: BlogCard[] = gridTitles.map((title, i) =>
  createBlogCard(i + 10, title)
);

// Export

export const blogListMock: BlogListPageData = {
  hero: {
    featured: heroFeatured,
    sideList: heroSide,
  },
  popular: popularList,
  blogs: gridBlogs,
  pagination: {
    count: 120,
    per_page: 8,
    current_page: 1,
    total_page: 6,
    has_more: true,
  },
};

// Detail

export const blogDetailMock: BlogDetail = {
  id: 1,
  slug: "en-iyi-15-pc-simulasyon-oyunu-2025",
  locale: "tr",
  title: "En İyi 15 PC Simülasyon Oyunu (2025)",
  description: "Simülasyon oyunları, oyunculara gerçek hayatta deneyimleyemeyecekleri senaryoları sunan, gerçekçiliği ve detaylarıyla dikkat çeken oyun türlerinden biridir. Bu listeyi oluştururken şu kriterlere dikkat ettik:",
  publishedAt: "05.01.2025",

  sections: [
{
  title: "Simülasyon Oyunlarını Nasıl Sıraladık?",
  content: `<p>Simülasyon oyunları, oyunculara gerçek hayatta deneyimleyemeyecekleri senaryoları sunan, gerçekçiliği ve detaylarıyla dikkat çeken oyun türlerinden biridir. Bu listeyi oluştururken şu kriterlere dikkat ettik:</p>
  <ul>
    <li><strong>Gerçekçilik:</strong> Oyunun sunduğu deneyimin ne kadar gerçekçi olduğu.</li>
    <li><strong>Oynanış Mekanikleri:</strong> Kullanıcı dostu arayüz, detaylı mekanikler ve derinlik.</li>
    <li><strong>Grafik ve Ses Kalitesi:</strong> Oyunun sunduğu görsel ve işitsel deneyim.</li>
    <li><strong>Topluluk ve Mod Desteği:</strong> Oyunun uzun ömürlü olmasını sağlayan topluluk desteği.</li>
    <li><strong>Popülerlik ve Kullanıcı İncelemeleri:</strong> Oyuncular tarafından ne kadar sevildiği.</li>
  </ul>
  <p>Liste, 15. sıradan başlayarak en iyi simülasyon oyununa kadar sıralanmıştır.</p>`,
  image: "/image/blog/blog-detail1.png",
},
    {
      title: "15. House Flipper",
      content: "Ev tadilatı ve dekorasyonuna ilgi duyanlar için mükemmel bir simülasyon oyunu olan House Flipper, oyunculara harabe haldeki evleri satın alıp restore edip kar elde etmelerini sağlıyor.",
      image: "/image/blog/featuredcard-mock-img.png",
    },
    {
      title: "14. Planet Coaster",
      content: "<p>Tycoon türünü sevenler için Planet Coaster, kendi eğlence parkınızı yaratmanızı sağlayan en iyi oyunlardan biri.</p><p>Oyunun derinlikli ekonomi ve yönetim sistemleri, her oyuncuya farklı deneyimler sunuyor.</p>",
      image: "/image/blog/blog-detail1.png",
    },
  ],
  relatedPosts: [
    createBlogCard(101, "En İyi 10 Simülasyon Oyunu (2025)"),
    createBlogCard(102, "En İyi 15 Simülasyon Oyunu (2025)"),
  ],
};