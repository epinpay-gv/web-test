"use client";

import { NavLinkCard } from "@/components/common";
import { navCards } from "../Header/navmenu.mock";

export function NavMenu() {
  return (
    <nav className="w-full flex items-center justify-center bg-(--bg-neutral-primary-soft) border-b mb-4 py-4 gap-4">
      {navCards.map((card) => (
        <NavLinkCard key={card.title} card={card} />
      ))}
    </nav>
  );
}