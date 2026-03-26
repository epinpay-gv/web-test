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
import clsx from "clsx";
import { Check, ChevronDown } from "flowbite-react-icons/outline";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/common";

const LANGUAGES = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

const CURRENCIES = [
  { code: "TRY", label: "TL", symbol: "₺" },
  { code: "USD", label: "USD", symbol: "$" },
  { code: "EUR", label: "EUR", symbol: "€" },
];

export function LocaleDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [currency, setCurrency] = React.useState(CURRENCIES[0]);

  // Cookie okuma yardımcısı
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  // Cookie ayarlama yardımcısı
  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax`;
  };

  React.useEffect(() => {
    const savedCurrencyCode = getCookie("currency");
    const savedLang = getCookie("ep-language");
    if (savedCurrencyCode) {
      const found = CURRENCIES.find((c) => c.code === savedCurrencyCode);
      if (found) setCurrency(found);
    } else {
      let defaultCur = CURRENCIES.find((c) => c.code === "TRY");
      if (currentLocale === "en") defaultCur = CURRENCIES.find((c) => c.code === "USD");
      else if (["de", "fr"].includes(currentLocale)) defaultCur = CURRENCIES.find((c) => c.code === "EUR");
      if (defaultCur) {
        setCurrency(defaultCur);
        setCookie("currency", defaultCur.code);
      }
    }
    if (!savedLang) setCookie("ep-language", currentLocale);
  }, []); // Sadece mount anında bir kez çalışır

  function handleLanguageChange(langCode: string) {
    setCookie("ep-language", langCode);
    router.replace(pathname, { locale: langCode });
  }

  function handleCurrencyChange(cur: typeof CURRENCIES[0]) {
    setCurrency(cur);
    setCookie("currency", cur.code);
  }
  const currentLanguage = LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0];
  const buttonName = `${currentLanguage.label} / ${currency.symbol} ${currency.label}  `

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          id="locale-dropdown-trigger"
          text={buttonName}
          aria-label="Localization"
          variant="ghost"
          appearance="filled"
          padding="sm"
          className="border-none! focus:ring-0 text-(--text-body) w-full"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 bg-(--bg-neutral-secondary-soft)"
      >
        {/* LANGUAGE SUBMENU */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-(--text-body)">
            <span>Language</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent className="bg-(--bg-neutral-secondary-soft)">
            {LANGUAGES.map((lang, index) => (
              <React.Fragment key={lang.code}>
                <DropdownMenuItem
                  onClick={() => handleLanguageChange(lang.code)}
                  className={clsx(
                    "flex items-center justify-between cursor-pointer",
                    currentLocale === lang.code && "bg-(--bg-neutral-tertiary)",
                  )}
                >
                  <span className="text-(--text-body)">
                    {lang.flag} {lang.label}
                  </span>
                  {currentLocale === lang.code && (
                    <Check className="w-4 h-4 text-(--text-body)" />
                  )}
                </DropdownMenuItem>
                {index < LANGUAGES.length - 1 && <DropdownMenuSeparator />}
              </React.Fragment>
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
            {CURRENCIES.map((cur, index) => (
              <React.Fragment key={cur.code}>
                <DropdownMenuItem
                  onClick={() => handleCurrencyChange(cur)}
                  className={clsx(
                    "cursor-pointer flex justify-between",
                    currency.code === cur.code && "bg-(--bg-neutral-tertiary)",
                  )}
                >
                  <span className="text-(--text-body)">{cur.label}</span>
                  {currency.code === cur.code && (
                    <Check className="w-4 h-4 text-(--text-body)" />
                  )}
                </DropdownMenuItem>
                {/* Son eleman değilse separator ekle */}
                {index < CURRENCIES.length - 1 && <DropdownMenuSeparator />}
              </React.Fragment>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
