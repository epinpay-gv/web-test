import { Rocket, BadgeCheck, Wallet } from "flowbite-react-icons/solid";
import {
  ChevronDoubleRight,
  ShieldCheck,
  UserHeadset,
} from "flowbite-react-icons/outline";

import { TrustLabelData } from "./trust-label.types";

export const TRUST_LABEL_DATA: TrustLabelData = {
  instantDelivery: { icon: Rocket, iconColor: "warning", title: "Anında Teslimat" },
  instantDeliverySecond: {
    icon: ChevronDoubleRight,
    title: "Anında Teslimat",
  },
  support: { icon: UserHeadset, title: "7/24 Destek" },
  verifiedStores: {
    icon: ShieldCheck,
    title: "Doğrulanmış Satıcılar",
  },
  licencedEpins: { icon: BadgeCheck, iconColor: "purple", title: "Lisanslı Epinler" },
  securePayment: { icon: Wallet, iconColor: "cyan",  title: "Güvenli Ödeme" },
};