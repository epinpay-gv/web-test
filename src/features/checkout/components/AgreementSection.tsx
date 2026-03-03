"use client";
import { CheckBox } from "@/components/common";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction, RefObject } from "react";
import type { CartErrors } from "../types";

interface AgreementSectionProps {
  isAgreed: boolean;
  setIsAgreed: Dispatch<SetStateAction<boolean>>;
  wantsInvoice: boolean;
  setWantsInvoice: Dispatch<SetStateAction<boolean>>;
  errors: CartErrors;
  setErrors: Dispatch<SetStateAction<CartErrors>>;
  agreementRef: RefObject<HTMLDivElement | null>;
}

export function AgreementSection({
  isAgreed,
  setIsAgreed,
  wantsInvoice,
  setWantsInvoice,
  errors,
  setErrors,
  agreementRef,
}: AgreementSectionProps) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <div ref={agreementRef} className="flex items-start gap-2 group">
        <CheckBox
          checked={isAgreed}
          onCheckedChange={(checked: boolean) => {
            setIsAgreed(checked);
            if (errors.agreement !== undefined)
              setErrors((prev) => ({ ...prev, agreement: undefined }));
          }}
          className={cn(
            "w-4 h-4 transition-all",
            errors.agreement === true &&
              "border-(--border-danger-subtle) ring-2 ring-danger/20"
          )}
        />
        <p className="text-xs leading-4 text-(--text-heading)">
          Ödemeye Devam Et butonuna tıklayarak
          <span className="text-(--text-fg-brand) font-medium cursor-pointer">
            {" "}Mesafeli Satış Sözleşmesini{" "}
          </span>
          ve
          <span className="text-(--text-fg-brand) font-medium cursor-pointer">
            {" "}İade ve İptal Koşullarını{" "}
          </span>
          okuduğumu ve kabul ettiğimi onaylıyorum.
        </p>
      </div>
      {errors.agreement === true && (
        <p className="text-xs text-(--text-fg-danger-strong) font-medium">
          Doldurulması zorunlu alan
        </p>
      )}
      <div className="flex gap-2 items-start">
        <CheckBox
          id="wantsInvoice"
          checked={wantsInvoice}
          onCheckedChange={(checked: boolean) => setWantsInvoice(checked)}
          className="w-4 h-4"
        />
        <label
          htmlFor="wantsInvoice"
          className="text-xs text-(--text-heading) cursor-pointer select-none"
        >
          Fatura istiyorum
        </label>
      </div>
    </div>
  );
}