"use client";

import { useState } from "react";
import { Button, Input } from "@/components/common";
import { QuestionCircle, CheckCircle } from "flowbite-react-icons/outline";
import { cn } from "@/lib/utils";

type DiscountStatus = "idle" | "success" | "error";
interface DiscountCodeFormProps {
  onApply: (discountAmount: number | null) => void;
}

export function DiscountCodeForm({onApply}: DiscountCodeFormProps) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<DiscountStatus>("idle");

  const handleAction = () => {
    if (status === "success") {
      setStatus("idle");
      setCode("");
      onApply(null);
      return;
    }
    
    if (code === "ABC123") {
      setStatus("success");
      onApply(50); 
    } else {
      setStatus("error");
      onApply(null);
    }
  };
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {/* Label Bölümü */}
      <label className="text-(--text-heading) text-sm leading-5 flex items-center gap-1 font-medium">
        İndirim kodu
        <span className="text-(--text-body) cursor-help">
          <QuestionCircle size={16} />
        </span>
      </label>

      {/* Input ve Button Grubu */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            value={code}
            onChange={(e) => {
                setCode(e.target.value);
                if(status !== "idle") setStatus("idle");
            }}
            placeholder="Kodu Gir"
            disabled={status === "success"}
            rightIcon={
              status === "success" ? (
                <CheckCircle size={16} className="text-(--text-fg-success-strong)" />
              ) : <></>
            }            
            className={cn(
                "py-2.5 px-3 transition-colors",                
            )}
          />
        </div>

        <div className="">
          <Button
            onClick={handleAction}
            text={status === "success" ? "Kodu İptal Et" : "Onayla"}
            variant={status === "success" ? "secondary" : "brand"}
            textSize="sm"
            padding="sm"
            className="py-2.5 px-4  h-full whitespace-nowrap"
          />
        </div>
      </div>

      {/* Bilgilendirme Mesajları */}
      {status === "success" && (
        <p className="text-(--text-fg-success-strong) text-xs font-medium animate-in fade-in slide-in-from-top-1">
          İndirim kodu uygulandı.
        </p>
      )}

      {status === "error" && (
        <p className="text-(--text-fg-danger-strong) text-xs leading-4 animate-in fade-in slide-in-from-top-1">
          Kod bulunamadı. Kodunuzda yazım hatası olup olmadığını kontrol edin ve tekrar deneyin.
        </p>
      )}
    </div>
  );
}