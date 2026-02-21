"use client";
import { ActionButtons } from "@/components/common/Cards/ProductCard/CardSections";
import { AddToCartPayload } from "@/components/common/Cards/ProductCard/types";
import { Product } from "@/types/types";
import InfoContainer from "./InfoContainer";
import { QuestionCircle } from "flowbite-react-icons/solid";
import { ShieldCheck } from "flowbite-react-icons/outline";
import PaymentProviderCard from "./PaymentProviderCard";
import { TrustLabels } from "@/components/common";

interface BasketSectionProps {
  data: Product;
}

export default function BasketSection({ data }: BasketSectionProps) {
  const paymentProviders = [
    { image: "/image/paymentProviders/applepay-white-logo.png", imageAlt: "Apple Pay" },
    { image: "/image/paymentProviders/gpay-white-logo.png", imageAlt: "Google Pay" },
    { image: "/image/paymentProviders/mastercard-white-logo.png", imageAlt: "Mastercard" },
    { image: "/image/paymentProviders/paypal-white-logo.png", imageAlt: "Paypal" },
    { image: "/image/paymentProviders/visa-white-logo.png", imageAlt: "Visa" },
    { image: "/image/paymentProviders/applepay-white-logo.png", imageAlt: "Apple Pay" },
    { image: "/image/paymentProviders/gpay-white-logo.png", imageAlt: "Google Pay" },
    { image: "/image/paymentProviders/mastercard-white-logo.png", imageAlt: "Mastercard" },
  ];
  return (
    <div className="flex flex-col gap-4 w-60">
      {/* PRICE */}
      <div className="card-container py-6 px-4 text-xl text-(--text-heading) font-semibold">
        $ {data.basePrice}
      </div>
      {/* ACTION BUTTONS */}
      <ActionButtons
        isHorizontal={false}
        orientation="vertical"
        addToCart={function (payload: AddToCartPayload): void {
          throw new Error("Function not implemented.");
        }}
      />
      {/* EP POINT INFO */}
      <InfoContainer
        title="Ep Puan ne işe yarar?"
        titleColor="text-(--text-fg-yellow)"
        titleIcon={<QuestionCircle size={24} />}
      >
        <ul className="list-disc pl-4 text-xs font-normal space-y-2">
          <li>Ep puan ile satılan özel ürünleri alabilirsiniz</li>
          <li>Harcadığınız tutarda ep puan kazanırsınız</li>
        </ul>
      </InfoContainer>
      {/* SECURE PAYMENT */}
      <InfoContainer
        title="Güvenli alışveriş"
        titleColor="text-(--text-fg-success)"
        titleIcon={<ShieldCheck size={24} />}
      >
        <p className="text-xs text-(--text-body)">
          Güvenilir +200 ödeme yöntemi
        </p>
        <div className="flex flex-wrap gap-1">
          {paymentProviders.map((item, index) => (
            <PaymentProviderCard
              image={item.image}
              imageAlt={item.imageAlt}
              key={index}
            />
          ))}
        </div>
        <TrustLabels labelList={["instantDeliverySecond", "support", "verifiedStores"]} orientation="vertical"/>
      </InfoContainer>
    </div>
  );
}
