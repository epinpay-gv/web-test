import { TrustLabels } from "@/components/common";

export function PromotedHeading() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="leading-[150%] max-w-92.75 text-2xl md:text-3xl font-bold bg-linear-to-r from-white to-[#24d7ff] bg-clip-text text-transparent">
        Oyun paranı anında yükle oyundan hiç kopma
      </h1>

      <div className="hidden md:block">
        <TrustLabels
          labelList={["instantDelivery", "licencedEpins", "securePayment"]}
          type="colorful"
        />
      </div>
    </div>
  );
}
