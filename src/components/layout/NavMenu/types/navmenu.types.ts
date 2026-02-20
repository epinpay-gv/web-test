import { TargetAndTransition } from "framer-motion";

export interface NavCardVariant {
  hoverBg?: string;
  hoverBorder?: string;
  hoverInsetShadow?: string;
}

export interface DecorAnimation {
  initial: TargetAndTransition;
  hover: TargetAndTransition;
}

export interface DecorVariant {
  decorImage: string;
  decorImageAlt?: string;
  width: number;
  height: number;
  animation: DecorAnimation;
}

export interface BaseNavItem {
  title: string;
  titleLocation: "top-left" | "center";
  isBgImage?: boolean;
  titleColor?: string;
  href: string;
  variant: NavCardVariant;
  decor: DecorVariant;
}

export type LinkNavItem = BaseNavItem & {
  type: "link";
};

export type MegaMenuNavItem = BaseNavItem & {
  type: "mega";
  megaMenuKey: string; 
};

export type NavCardConfig = LinkNavItem | MegaMenuNavItem;