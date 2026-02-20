"use client";

import { MegaMenu, NavLinkCard } from "@/components/common";
import { navCards } from "./data/navmenu.mock";
import { useState } from "react";
import { megaMenus } from "./data/megamenu.mock";

export function NavMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav className="relative w-full flex items-center justify-center bg-(--bg-neutral-primary-soft) border-b pt-4 gap-2">
      {navCards.map((card) => {
        const isMega = card.type === "mega";

        return (
          <div
            key={card.title}
            className="relative pb-4"
            onMouseEnter={() => isMega && setActiveMenu(card.title)}
            onMouseLeave={() => isMega && setActiveMenu(null)}
          >
            <NavLinkCard card={card} />

            {isMega && (
              <MegaMenu
                {...megaMenus[card.megaMenuKey]}
                open={activeMenu === card.title}
                onMouseEnter={() => setActiveMenu(card.title)}
                onMouseLeave={() => setActiveMenu(null)}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
