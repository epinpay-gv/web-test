import { NavCardConfig } from "../types/navmenu.types";

export function getNavCards(t: (key: string) => string): NavCardConfig[] {
  return [
    // PRODUCTS
    {
      type: "mega",
      megaMenuKey: "products",
      title: t("games"),
      href: "/products",
      variant: {
        hoverBg: "rgba(0, 187, 167, 1)",
        hoverBorder: "#fff",
        hoverInsetShadow: "inset 0 0 10px rgba(255,255,255,1)",
      },
      decor: {
        decorImage: "/navMenu/card-1.png",
        width: 80,
        height: 55,
        animation: {
          initial: { x: 55, y: 15, scale: 1, rotate: 30 },
          hover: { x: 55, y: 15, scale: 1.5, rotate: 10 },
        },
      },
      titleLocation: "top-left",
    },

    // RAFFLES
    {
      type: "link",
      title: t("raffles"),
      href: "/raffles",
      variant: {
        hoverBg: "rgba(255, 138, 76, 1)",
        hoverBorder: "#fff",
        hoverInsetShadow: "inset 0 0 10px rgba(255,255,255,1)",
      },
      decor: {
        decorImage: "/navMenu/card-3.png",
        width: 64,
        height: 65,
        animation: {
          initial: { x: 50, y: 0, scale: 1, rotate: -10 },
          hover: { x: 40, y: -5, scale: 1.2, rotate: -10 },
        },
      },
      secondDecor: {
        decorImage: "/navMenu/card-3-2.webp",
        width: 64,
        height: 65,
        animation: {
          initial: { x: 0, y: -70, scale: 1.5 },
          hover: { x: 0, y: 5, scale: 1.5 },
        },
      },
      titleLocation: "top-left",
    },

    // STREAMERS
    {
      type: "link",
      title: t("stramers"),
      href: "/streamers",
      variant: {
        hoverBg: "rgba(255, 95, 95, 1)",
        hoverBorder: "#fff",
        hoverInsetShadow: "inset 0 0 10px rgba(255,255,255,1)",
      },
      decor: {
        decorImage: "/navMenu/card-2.webp",
        width: 73,
        height: 67,
        animation: {
          initial: { x: 15, y: 20, scale: 1 },
          hover: { x: 15, y: 10, scale: 1.2 },
        },
      },
      titleLocation: "top-left",
    },

    // MINI GAMES
    {
      type: "link",
      title: t("epgames"),
      href: "/mini-games",
      variant: {
        hoverBg: "rgba(97, 95, 255, 1)",
        hoverBorder: "#fff",
        hoverInsetShadow: "inset 0 0 10px rgba(255,255,255,1)",
      },
      decor: {
        decorImage: "/navMenu/card-4.png",
        width: 86,
        height: 86,
        animation: {
          initial: { x: 40, y: -5, scale: 1, rotate: -60 },
          hover: { x: 30, y: -10, scale: 1.4, rotate: -50 },
        },
      },
      secondDecor: {
        decorImage: "/navMenu/card-4-2.webp",
        width: 64,
        height: 65,
        animation: {
          initial: { x: -35, y: 22, scale: 0.5, rotate: 0 },
          hover: { x: -20, y: 5, scale: 0.5, rotate: -10 },
        },
      },
      titleLocation: "top-left",
    },

    // PREMIUM
    {
      type: "link",
      title: "Premium",
      href: "/premium",
      variant: {
        hoverBg: "rgba(97, 95, 255, 0)",
        hoverBorder: "#CCBA76",
        hoverInsetShadow: `
  inset 0 -6px 12px rgba(255, 232, 147, 0.9),
  inset 0 2px 4px rgba(255, 232, 147, 0.4)
`,
      },
      decor: {
        decorImage: "/navMenu/card-5.png",
        width: 180,
        height: 55,
        animation: {
          initial: { x: -5, y: -100, scale: 0.3 },
          hover: { x: -5, y: -30, scale: 0.3 },
        },
      },
      titleLocation: "center",
      isBgImage: false,
      titleColor: "#FDC700",
    },
  ];
}
