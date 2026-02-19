"use client";

import { NavLinkCard } from "@/components/common";

export function NavMenu() {
  const navCards = [
    {
      title: "Ürünler",
      href: "/categories/games",
      decorImage: "/navMenu/card-1.png",
      variant: {
        hoverBg: "rgba(0, 187, 167, 1)",
        hoverBorder: "#fff",
        hoverInsetShadow: "inset 0 0 10px rgba(255,255,255,1)",
      },
    },
    {
      title: "Yayıncılarımız",
      href: "/categories/gift-card",
      decorImage: "/navMenu/card-2.png",
      variant: {
        hoverBg: "rgba(255, 95, 95, 1)",
        hoverBorder: "#fff",
        hoverInsetShadow: "inset 0 0 10px rgba(255,255,255,1)",
      },
    },
    {
      title: "Çekilişler",
      href: "/premium",
      decorImage: "/navMenu/card-3.png",
      variant: {
        hoverBg: "rgba(120, 90, 255, 1)",
        hoverBorder: "#fff",
        hoverInsetShadow: "inset 0 0 10px rgba(255,255,255,1)",
      },
    },
    {
      title: "EP Oyunları",
      href: "/streamers",
      decorImage: "/navMenu/card-4.png",
      variant: {
        hoverBg: "rgba(255, 180, 0, 1)",
        hoverBorder: "#fff",
        hoverInsetShadow: "inset 0 0 10px rgba(255,255,255,1)",
      },
    },
    {
      title: "Premium",
      href: "/mini-games",
      decorImage: "/navMenu/card-5.png",
      variant: {
        hoverBg: "",
        hoverBorder: "#FFE893",
        hoverInsetShadow: "inset 0 0 10px rgba(255,255,255,1)",
      },
    },
  ];

  return (
    <nav className="w-full flex items-center justify-center bg-(--bg-neutral-primary-soft) border-b mb-4 py-4 gap-4">
      {navCards.map((card) => (
        <NavLinkCard key={card.title} {...card} />
      ))}
    </nav>
  );
}
