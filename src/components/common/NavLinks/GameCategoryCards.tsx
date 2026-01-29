import BaseCard from "@/components/common/NavLinks/BaseCard";
import Image from "next/image";
import Link from "next/link"

export default function GameCategoryCards() {
  const mockCategories = [
    { id: 1, title: "Pubg Mobile", slug: "pubgmobile", image: "/image/mock-img.png" },
    { id: 2, title: "League of Legends RP", slug: "leagneoflegendsrp", image: "/image/mock-img.png" },
    { id: 3, title: "Rise Online", slug: "riseonline", image: "/image/mock-img.png" },
    { id: 4, title: "Valorant VP", slug:"valorantvp", image: "/image/mock-img.png" },
    { id: 5, title: "Metin2 RP", slug:"metin2rp", image: "/image/mock-img.png" },
    { id: 6, title: "Nowa Online World", slug:"nowaonline", image: "/image/mock-img.png" },
    { id: 7, title: "Joypara JP", slug:"joypara", image: "/image/mock-img.png" },
    { id: 8, title: "Knight Online", slug:"knightonline", image: "/image/mock-img.png" },
    { id: 9, title: "Apex Legends", slug:"apexlegends", image: "/image/mock-img.png" },
    { id: 10, title: "Fortnite", slug:"fortnite", image: "/image/mock-img.png" },
    { id: 11, title: "EA Sports", slug:"easports", image: "/image/mock-img.png" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2" style={{ width: '518px', height: '276px', rowGap: '8px', columnGap: '8px' }}>
      {mockCategories.map((category) => (
        <Link key={category.id} href={`/categories/${category.slug}`} className="block">
        <BaseCard
          key={category.id}
          onClick={() => console.log(category.title)}
          className="relative w-[123.5px] h-[86.66px] rounded-3xl overflow-hidden flex items-center justify-center text-center"
        >
          <div className="absolute inset-0 bg-black/40 z-1" />

          {/* Background Image */}
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover"
          />

          {/* Title */}
          <span
            className="
            relative
            z-10
            font-inter
            text-sm
            font-semibold
            text-white
          "
          >
            {category.title}
          </span>
        </BaseCard>
        </Link>
      ))}

      {/* 12. Kart */}
      <Link href="/categories" className="block">
      <BaseCard
        onClick={() => console.log("Tüm oyunlar")}
        className="
          w-[123.5px] h-[86.66px] rounded-3xl flex items-center justify-center text-center bg-(--bg-brand) "
      >
        <span className="font-inter text-black text-sm font-semibold">
          Tüm Oyunları Keşfet
        </span>
      </BaseCard>
      </Link>
    </div>
  );
}