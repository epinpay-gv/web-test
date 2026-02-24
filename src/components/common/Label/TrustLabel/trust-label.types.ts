import { ComponentType } from "react";

export type LabelType = "default" | "colorful";

export type IconColor = "warning" | "purple" | "cyan";

export type TrustLabelKey =
  | "instantDelivery"
  | "instantDeliverySecond"
  | "support"
  | "verifiedStores"
  | "licencedEpins"
  | "securePayment";

export type IconType = ComponentType<{
  size?: number;
  className?: string;
}>;

export type TrustLabelItem = {
  icon: IconType;
  iconColor?: IconColor;
  title: string;
};

export type TrustLabelData = Record<TrustLabelKey, TrustLabelItem>;