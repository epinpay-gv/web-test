"use client";

import { MegaMenu, NavLinkCard } from "@/components/common";
import { navCards } from "./data/navmenu.mock";
import { megaMenus } from "./data/megamenu.mock";
import { useState } from "react";

export function NavMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav className="relative w-full border-b bg-(--bg-neutral-primary-soft)">
      {/* width constraint burada */}
      <div className="max-w-7xl mx-auto">
        
        {/* scroll container */}
        <div className="
          overflow-x-auto 
          md:overflow-visible
          scrollbar-hide
        ">
          {/* flex container */}
          <div className="
            flex gap-2
            min-w-max
            md:min-w-0
            md:justify-center
            px-4 pt-4
          ">
            {navCards.map((card) => {
              const isMega = card.type === "mega";

              return (
                <div
                  key={card.title}
                  className="relative pb-4 shrink-0"
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
          </div>
        </div>
      </div>
    </nav>
  );
}