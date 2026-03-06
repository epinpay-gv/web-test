import { UserSettingsDTO, CountryOption, CurrencyOption } from "@/features/user/user.types";

export const mockUserSettings: UserSettingsDTO = {
  system: {
    country: "TR",
    currency: "TRY",
  },
  notifications: {
    email: true,
  },
};

export const countryOptions: CountryOption[] = [
  { label: "English (US)", value: "US" },
  { label: "Türkiye", value: "TR" },
  { label: "Almanya", value: "DE" },
];

export const currencyOptions: CurrencyOption[] = [
  { label: "Türk Lirası (TRY)", value: "TRY" },
  { label: "Euro (EUR)", value: "EUR" },
  { label: "Dolar (USD)", value: "USD" },
];