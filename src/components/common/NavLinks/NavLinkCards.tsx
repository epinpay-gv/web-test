import BaseCard from "@/components/common/NavLinks/BaseCard";
import Image from "next/image";
import Link from "next/link";

export default function NavLinkCards() {
  const mockNavLinkCards = [
    { id: 1, title: "Ürünler", slug: "products", image: "/image/navLinks-img-mock.png", bgImage: "/image/navLinks-bg-mock.png" },
    { id: 2, title: "Çekilişler", slug: "giveaways", image: "/image/navLinks-img-mock.png", bgImage: "/image/navLinks-bg-mock.png"  },
    { id: 3, title: "Yayıncılarımız", slug: "streamers", image: "/image/navLinks-img-mock.png", bgImage: "/image/navLinks-bg-mock.png"  },
    { id: 4, title: "EP Oyunları", slug: "ep-games", image: "/image/navLinks-img-mock.png", bgImage: "/image/navLinks-bg-mock.png"  },
    { id: 5, title: "Premium", slug: "premium", isPremium: true }
  ];

  return (
    <div className="w-full my-4 flex items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        {mockNavLinkCards.map((navLink) => (
          <Link key={navLink.id} href={`/${navLink.slug}`} className="block group">
            <BaseCard
              onClick={() => console.log(navLink.title)}
              className={`relative w-31.5 h-18 my-3 rounded-lg overflow-hidden flex text-center ${
                navLink.isPremium ? 'items-center justify-center border-none' : 'items-start justify-start'
              }`}
            >
              {!navLink.isPremium && navLink.bgImage && navLink.image && (
                <>
                  {/* Background Image */}
                  <Image
                    src={navLink.bgImage}
                    alt={`${navLink.title} background`}
                    fill
                    className="object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 z-1" />

                  {/* Image */}
                  <Image
                    src={navLink.image}
                    alt={navLink.title}
                    fill
                    className="object-cover z-2 translate-x-1/4 translate-y-1/4 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:z-20 transition-all duration-300"
                  />
                </>
              )}

              {/* Title */}
              <span className={`relative z-10 font-inter text-sm font-semibold ${
                navLink.isPremium ? 'text-[#FDC700]' : 'text-white p-2'
              }`}>
                {navLink.title}
              </span>
            </BaseCard>
          </Link>
        ))}
      </div>
    </div>
  );
}