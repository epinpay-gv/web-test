export interface UserSettingsDTO {
  system: {
    country: string;
    currency: string;
  };
  notifications: {
    email: boolean;
  };
}

export const mockUserSettings: UserSettingsDTO = {
  system: {
    country: "TR",
    currency: "TRY",
  },
  notifications: {
    email: true,
  },
};

export const countryOptions = [
  {label: "English (US)", value: "US"},
  { label: "Türkiye", value: "TR" },
  { label: "Almanya", value: "DE" },
];

export const currencyOptions = [
  { label: "Türk Lirası (TRY)", value: "TRY" },
  { label: "Euro (EUR)", value: "EUR" },
  { label: "Dolar (USD)", value: "USD" },
];