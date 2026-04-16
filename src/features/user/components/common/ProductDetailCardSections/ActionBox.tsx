import { Button } from "@/components/common";
import { BffOrderItem } from "@/features/user/user.types";
import { Check, Eye } from "flowbite-react-icons/outline";
import { Copy, EyeOff } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface ActionBoxProps {
  topUpSelection?: "disputed" | "confirmed";
  handleCopyCode: (code: string, index: number) => void;
  handleConfirm: () => void;
  handleDispute: (reason?: string) => void;
  handleViewEpin: () => void;
  copiedIndex: number | null;
  codeVisible: boolean;
  setCodeVisible: Dispatch<SetStateAction<boolean>>;
  product: BffOrderItem;
  epinCodes: string[];
}

export default function ActionBox({
  topUpSelection,
  handleCopyCode,
  handleConfirm,
  handleDispute,
  handleViewEpin,
  copiedIndex,
  codeVisible,
  product,
  setCodeVisible,
  epinCodes,
}: ActionBoxProps) {
  return (
    <>
      {product.canConfirm && (
        <div className="flex flex-col gap-2 items-end border-2 border-dashed border-(--border-brand-light) bg-(--bg-brand-softer) rounded-xl px-4 py-3">
          <span className="text-(--text-body) text-sm">
            Ürünü teslim aldınız mı?
          </span>
          <div className="flex items-center gap-2">
            <Button
              text="Teslim Aldım"
              textSize="xs"
              variant="success"
              onClick={handleConfirm}
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
        </div>
      )}

      {product.canViewEpin && (
        <div className="flex flex-col gap-2 items-end border-2 border-dashed border-(--border-brand-light) bg-(--bg-brand-softer) rounded-xl px-4 py-3">
          <span className="text-(--text-body) text-sm">ürün kodu</span>
          {epinCodes.length > 0 ? (
            <div className="flex flex-col gap-1.5 w-full items-end">
              {epinCodes.map((code, index) => {
                const maskedCode = code.replace(/[^\s]/g, "*");
                return (
                  <div key={index} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-(--bg-success)">
                    <Button
                      icon={
                        copiedIndex === index ? (
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
                      onClick={() => handleCopyCode(code, index)}
                    />
                    <span className="text-sm font-mono text-white tracking-widest select-all">
                      {codeVisible ? code : maskedCode}
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
                );
              })}
            </div>
          ) : (
            <Button
              text="Kodu Göster"
              textSize="xs"
              variant="brand"
              onClick={handleViewEpin}
              className="rounded-2xl"
            />
          )}
        </div>
      )}
    </>
  );
}
