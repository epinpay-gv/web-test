import { OrderProduct } from "@/features/user/user.types";
import { useOrderProductStatus } from "../hooks/useOrderProductStatus";
import ActionBox from "./ProductDetailCardSections/ActionBox";
import CardInfo from "./ProductDetailCardSections/CardInfo";
import CardStatus from "./ProductDetailCardSections/CardStatus";

interface ProductDetailCardProps {
  orderId: string;
  product: OrderProduct;
}

export default function ProductDetailCard({
  orderId,
  product,
}: ProductDetailCardProps) {
  const {
    copied,
    codeVisible,
    setCodeVisible,
    maskedCode,
    handleCopyCode,
    handleConfirm,
    handleDispute,
  } = useOrderProductStatus(orderId, product);

  return (
    <div className="p-4 border-b flex flex-col md:flex-row md:justify-between gap-4">
      <div className="flex justify-between flex-col md:flex-row gap-2">
        <CardInfo product={product} />
        <CardStatus product={product} />
      </div>
      <ActionBox
        copied={copied}
        handleCopyCode={handleCopyCode}
        handleConfirm={handleConfirm}
        handleDispute={handleDispute}
        codeVisible={codeVisible}
        setCodeVisible={setCodeVisible}
        product={product}
        maskedCode={maskedCode}
      />
    </div>
  );
}
