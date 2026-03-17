import { Button } from "@/components/common";
import { OrderProduct, TopupResponsePayload } from "../../user.types";
import { Check, Eye } from "flowbite-react-icons/outline";
import { Copy, EyeOff } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface ActionBoxProps {
  topUpSelection?: "disputed" | "confirmed";
  handleCopyCode: () => void;
  handleConfirm: (payload: TopupResponsePayload) => void;
  handleDispute: (reason?: string | undefined) => void;
  copied: boolean;
  codeVisible: boolean;
  setCodeVisible: Dispatch<SetStateAction<boolean>>;
  product: OrderProduct;
  maskedCode: string;

}

export type OrderItemStatus =
  | "PENDING_PAYMENT"      // Beklemede       
  | "PAID"                 // Beklemede
  | "EPIN_READY"           // Teslim Edildi
  | "AWAITING_DELIVERY"    // Beklemede
  | "DELIVERED"            // Teslim Edildi
  | "COMPLETED"            // Teslim Edildi
  | "DISPUTED"             // Beklemede
  | "TIMEOUT"              // İptal Edildi
  | "CANCELLED";           // İptal Edildi

export default function ActionBox({
  topUpSelection,
  handleCopyCode,
  handleConfirm,
  handleDispute,
  copied,
  codeVisible,
  product,
  setCodeVisible,
  maskedCode
}: ActionBoxProps) {
  const productCancelled = ["CANCELLED", "TIMEOUT"].includes(product.status);
  const productWaiting = ["PAID", "PENDING_PAYMENT", "AWAITING_DELIVERY", "DISPUTED"].includes(product.status);
  const productCompleted = ["EPIN_READY", "DELIVERED", "COMPLETED" ].includes(product.status);


  const showTopupBox = (product.itemType === "TOP_UP" || product.itemType === "DROPSHIPPING") && productWaiting;
  const showEpinBox = product.itemType === "NORMAL" && productCompleted ;

  return (
    <>
      {showTopupBox && (
        <div className="flex flex-col gap-2 items-end border-2 border-dashed border-(--border-brand-light) bg-(--bg-brand-softer) rounded-xl px-4 py-3">
          <span className="text-(--text-body) text-sm">
            Ürünü teslim aldınız mı?
          </span>
          <div className="flex items-center gap-2">
            <Button
              text="Teslim Aldım"
              textSize="xs"
              variant="success"
              onClick={() =>
                handleConfirm({
                  status: "confirm",
                })
              }
              disabled={topUpSelection === "disputed"}
              className="rounded-2xl flex-1"
            />
            <Button
              text="Teslim Almadım"
              textSize="xs"
              variant="warning"
              onClick={() => handleDispute()}
              disabled={topUpSelection === "confirmed"}
              className="whitespace-nowrap rounded-2xl flex-1"
            />
          </div>
          {topUpSelection === "disputed" ? (
            <button
              type="button"
              onClick={() => {}}
              className="text-xs text-(--text-fg-brand) hover:opacity-80 transition-opacity"
            >
              Sorun bildir
            </button>
          ) : (
            <span className="text-xs text-(--text-body)">
              Nasıl kullanırım?{" "}
              <span className="text-(--text-fg-brand)">incele</span>
            </span>
          )}
        </div>
      )}
      {showEpinBox && (
        <div className="flex flex-col gap-2 items-end border-2 border-dashed border-(--border-brand-light) bg-(--bg-brand-softer) rounded-xl px-4 py-3">
          <span className="text-(--text-body) text-sm">ürün kodu</span>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-(--bg-success)">
            <Button
              icon={
                copied ? (
                  <Check size={13} className="text-white" />
                ) : (
                  <Copy size={13} className="text-white" />
                )
              }
              size="xs"
              variant="ghost"
              appearance="filled"
              padding="rounded"
              title="Kopyala"
              onClick={handleCopyCode}
            />
            <span className="text-sm font-mono text-white tracking-widest select-all">
              {codeVisible ? product.code : maskedCode}
            </span>
            <Button
              icon={
                codeVisible ? (
                  <EyeOff size={13} className="text-white" />
                ) : (
                  <Eye size={13} className="text-white" />
                )
              }
              size="xs"
              variant="ghost"
              appearance="filled"
              padding="rounded"
              title={codeVisible ? "Gizle" : "Göster"}
              onClick={() => setCodeVisible((v: boolean) => !v)}
            />
          </div>
        </div>
      )}
    </>
  );
}
