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
import { Check } from "flowbite-react-icons/outline";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/common";
import { baseFetcher } from "@/lib/api/baseFetcher";

interface Language {
  code: string;
  label: string;
  flag: string;
}

interface Currency {
  code: string;
  label: string;
  symbol: string;
}

interface AppConfigResponse {
  success: boolean;
  data: {
    languages: Language[];
    currencies: Currency[];
  };
}

export function LocaleDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const [languages, setLanguages] = React.useState<Language[]>([]);
  const [currencies, setCurrencies] = React.useState<Currency[]>([]);
  const [currency, setCurrency] = React.useState<Currency | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);



  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2
      ? parts.pop()?.split(";").shift()
      : null;
  };

  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax`;
  };



  React.useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await baseFetcher<AppConfigResponse>(
          "/app-config"
        );

        if (response.success && response.data) {
          console.log("APP-CONFIG RESPONSE:", response);
          const { languages, currencies } = response.data;

          setLanguages(languages);
          setCurrencies(currencies);

          initializeSelection(languages, currencies);
        }
      } catch (err) {
        console.error("Config fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);



  const initializeSelection = (
    availLangs: Language[],
    availCurs: Currency[]
  ) => {
    const savedCurrencyCode = getCookie("currency");
    const savedLang = getCookie("ep-language");

    // currency
    if (savedCurrencyCode) {
      const found = availCurs.find((c) => c.code === savedCurrencyCode);
      if (found) setCurrency(found);
    } else {
      let defaultCur =
        availCurs.find((c) => c.code === "TRY") ?? availCurs[0];

      if (currentLocale === "en")
        defaultCur = availCurs.find((c) => c.code === "USD") ?? defaultCur;
      else if (["de", "fr"].includes(currentLocale))
        defaultCur = availCurs.find((c) => c.code === "EUR") ?? defaultCur;

      if (defaultCur) {
        setCurrency(defaultCur);
        setCookie("currency", defaultCur.code);
      }
    }

    if (!savedLang) setCookie("ep-language", currentLocale);
  };

  /* ================= HANDLERS ================= */

  const handleLanguageChange = (langCode: string) => {
    setCookie("ep-language", langCode);
    router.replace(pathname, { locale: langCode });
  };

  const handleCurrencyChange = (cur: Currency) => {
    setCurrency(cur);
    setCookie("currency", cur.code);
  };

  /* ================= DERIVED VALUES ================= */

  const currentLanguage =
    languages.find((l) => l.code === currentLocale) || languages[0];

  const isReady =
    languages.length > 0 && currencies.length > 0 && currency;

  const buttonName = !isReady
    ? "Loading..."
    : `${currentLanguage.label} / ${currency?.symbol} ${currency?.label}`;

  /* ================= UI ================= */

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
          disabled={isLoading}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 bg-(--bg-neutral-secondary-soft)"
      >
        {/* LANGUAGE */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Language</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent>
            {languages.map((lang, index) => (
              <React.Fragment key={lang.code}>
                <DropdownMenuItem
                  onClick={() => handleLanguageChange(lang.code)}
                  className={clsx(
                    "flex items-center justify-between cursor-pointer",
                    currentLocale === lang.code &&
                      "bg-(--bg-neutral-tertiary)"
                  )}
                >
                  <span>
                    {lang.flag} {lang.label}
                  </span>

                  {currentLocale === lang.code && (
                    <Check className="w-4 h-4" />
                  )}
                </DropdownMenuItem>

                {index < languages.length - 1 && (
                  <DropdownMenuSeparator />
                )}
              </React.Fragment>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* CURRENCY */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Currency</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent>
            {currencies.map((cur, index) => (
              <React.Fragment key={cur.code}>
                <DropdownMenuItem
                  onClick={() => handleCurrencyChange(cur)}
                  className={clsx(
                    "flex justify-between cursor-pointer",
                    currency?.code === cur.code &&
                      "bg-(--bg-neutral-tertiary)"
                  )}
                >
                  <span>{cur.label}</span>

                  {currency?.code === cur.code && (
                    <Check className="w-4 h-4" />
                  )}
                </DropdownMenuItem>

                {index < currencies.length - 1 && (
                  <DropdownMenuSeparator />
                )}
              </React.Fragment>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}