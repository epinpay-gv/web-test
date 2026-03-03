"use client";
import { Input } from "@/components/common";
import { CheckBox } from "@/components/common";
import { Envelope } from "flowbite-react-icons/outline";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction, RefObject } from "react";
import type { CartErrors } from "../types";

interface EmailSectionProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  errors: CartErrors;
  setErrors: Dispatch<SetStateAction<CartErrors>>;
  emailInputRef: RefObject<HTMLDivElement | null>;
  agreementRef: RefObject<HTMLDivElement | null>;
}

export function EmailSection({
  email,
  setEmail,
  errors,
  setErrors,
  emailInputRef,
  agreementRef,
}: EmailSectionProps) {
  return (
    <div
      ref={emailInputRef}
      className="flex flex-col gap-4 border-b border-(--border-default) pb-4 animate-in fade-in duration-500"
    >
      <p className="text-(--text-heading) text-sm mb-2 font-medium">
        E-posta adresinizi girin. Siparişinizi göndermek için e-posta adresinize ihtiyacımız var.
      </p>
      <Input
        placeholder="Email adresinizi girin"
        leftIcon={<Envelope size={16} className="z-10" />}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (errors.email !== undefined)
            setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        aria-invalid={errors.email === true ? true : undefined}
      />
      {errors.email === true && (
        <p className="text-xs text-(--text-fg-danger-strong) font-medium">
          Doldurulması zorunlu alan
        </p>
      )}
      <div ref={agreementRef} className="flex items-start gap-2 group">
        <CheckBox
          className={cn(
            "w-4 h-4",
            errors.agreement === true &&
              "border-(--border-danger-subtle) ring-2 ring-danger/20"
          )}
        />
        <p className="text-xs leading-4 text-(--text-heading)">
          Bu mail ile hesap oluştur. Avantajlardan faydalan
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-white text-lg font-semibold">Üyelik avantajları</h3>
        <ul className="list-disc list-inside space-y-1">
          {[
            "Siparişlerinizi takip edin",
            "Her alışverişte Ep Puan kazan",
            "Desteğe erişin ve satıcılarla daha kolay iletişim kurun",
          ].map((item) => (
            <li
              key={item}
              className="text-(--text-fg-brand) text-sm font-medium marker:text-(--text-fg-brand)"
            >
              <span className="text-(--text-fg-brand) -ml-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}