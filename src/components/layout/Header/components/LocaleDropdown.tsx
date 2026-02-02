"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import clsx from "clsx";

export function LocaleDropdown() {
  const LANGUAGES = [
    { code: "tr", label: "Türkçe", flag: "🇹🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];

  const CURRENCIES = [
    { code: "TRY", label: "TL", symbol: "₺"},
    { code: "USD", label: "USD", symbol: "$"},
    { code: "EUR", label: "EUR", symbol: "€" },
  ];

  const [language, setLanguage] = React.useState(LANGUAGES[0]);
  const [currency, setCurrency] = React.useState(CURRENCIES[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={clsx(
            "flex items-center gap-2 px-3 py-2 rounded-md",
            "text-sm text-(--text-body)",
            "bg-(--bg-neutral-secondary-soft)",
            "hover:bg-(--bg-neutral-tertiary)",
            "transition-colors",
            "focus:border-0",
            "outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
          )}
        >
          <span>{language.label}</span>
          <span className="text-neutral-400">/</span>
          <span>{currency.symbol}</span>
          <span>{currency.label}</span>
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 bg-(--bg-neutral-secondary-soft)"
      >
        {/* LANGUAGE SUBMENU */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center text-(--text-body) justify-between">
            <div className="flex items-center gap-2">
              <span>Language</span>
            </div>
        
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent className="bg-(--bg-neutral-secondary-soft)">
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang)}
                className={clsx(
                  "flex items-center gap-2 cursor-pointer",
                  language.code === lang.code &&
                    "bg-(--bg-neutral-tertiary)"
                )}
              >
                <span className="text-(--text-body)">{lang.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* CURRENCY SUBMENU */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center text-(--text-body) justify-between">
            <span>Currency</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent className="bg-(--bg-neutral-secondary-soft)">
            {CURRENCIES.map((cur) => (
              <DropdownMenuItem
                key={cur.code}
                onClick={() => setCurrency(cur)}
                className={clsx(
                  "cursor-pointer",
                  currency.code === cur.code &&
                    "bg-(--bg-neutral-tertiary)"
                )}
              >
                <span className="text-(--text-body)">{cur.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
