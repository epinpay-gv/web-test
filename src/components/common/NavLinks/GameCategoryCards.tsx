import BaseCard from "@/components/common/NavLinks/NavCards/BaseCard";
import Image from "next/image";
import Link from "next/link";

export default function GameCategoryCards() {
  const mockCategories = [
    {
      id: 1,
      title: "Pubg Mobile",
      slug: "pubgmobile",
      image: "/image/mock-img.png",
    },
    {
      id: 2,
      title: "League of Legends RP",
      slug: "leagneoflegendsrp",
      image: "/image/mock-img.png",
    },
    {
      id: 3,
      title: "Rise Online",
      slug: "riseonline",
      image: "/image/mock-img.png",
    },
    {
      id: 4,
      title: "Valorant VP",
      slug: "valorantvp",
      image: "/image/mock-img.png",
    },
    {
      id: 5,
      title: "Metin2 RP",
      slug: "metin2rp",
      image: "/image/mock-img.png",
    },
    {
      id: 6,
      title: "Nowa Online World",
      slug: "nowaonline",
      image: "/image/mock-img.png",
    },
    {
      id: 7,
      title: "Joypara JP",
      slug: "joypara",
      image: "/image/mock-img.png",
    },
    {
      id: 8,
      title: "Knight Online",
      slug: "knightonline",
      image: "/image/mock-img.png",
    },
    {
      id: 9,
      title: "Apex Legends",
      slug: "apexlegends",
      image: "/image/mock-img.png",
    },
    {
      id: 10,
      title: "Fortnite",
      slug: "fortnite",
      image: "/image/mock-img.png",
    },
    {
      id: 11,
      title: "EA Sports",
      slug: "easports",
      image: "/image/mock-img.png",
    },
  ];

  return (
    <div
      className="grid grid-cols-4 gap-2 w-full md:w-129.5 md:h-69"
      style={{ rowGap: "8px", columnGap: "8px" }}
    >
      {mockCategories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="block"
        >
          <BaseCard
            className="relative w-full aspect-[123.5/86.66] md:w-[123.5px] md:h-[86.66px] rounded-3xl overflow-hidden group flex items-center justify-center text-center transition-all duration-300 hover:scale-120 hover:z-10"
          >
            {/* Background Image */}
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover"
            />

            {/* Inner shadow */}
            <div
              className="
                absolute inset-0
                pointer-events-none
                opacity-0
                transition-opacity transaction-shadow duration-300
                group-hover:opacity-100
                shadow-[inset_0_0_30px_10px_rgba(255,255,255,0.7)]
              "
            />

            {/* Title */}
            <span className="relative z-10 font-inter text-sm font-semibold text-white">
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
          w-full aspect-[123.5/86.66] md:w-[123.5px] md:h-[86.66px] rounded-3xl flex items-center justify-center text-center bg-(--bg-brand) "
        >
          <span className="font-inter text-black text-sm font-semibold">
            Tüm Oyunları Keşfet
          </span>
        </BaseCard>
      </Link>
    </div>
  );
}