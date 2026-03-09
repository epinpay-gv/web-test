import "server-only";

export type Locale = "en" | "tr" | "de" | "fr";

export async function getDictionary(locale: Locale) {
  const common = (await import(`./dictionaries/${locale}/common.json`)).default;
  const mainpage = (await import(`./dictionaries/${locale}/mainpage.json`))
    .default;
  const layout = (await import(`./dictionaries/${locale}/layout.json`)).default;
  const auth = (await import(`./dictionaries/${locale}/auth.json`)).default;
  const catalog = (await import(`./dictionaries/${locale}/catalog.json`))
    .default;
  const notifications = (
    await import(`./dictionaries/${locale}/notifications.json`)
  ).default;

  return {
    common,
    mainpage,
    layout,
    auth,
    catalog,
    notifications,
  };
}
