"use client";
import { Button, Modal, BottomSheet } from "@/components/common";
import { DiscountCodeForm } from "./DiscountCodeForm";
import { useRef, useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useOrderAuth } from "../hooks/useOrderAuth";
import { AuthView } from "@/features/auth/auth.types";
import { EmailSection } from "./EmailSection";
import { PriceSummary } from "./PriceSummary";
import { AgreementSection } from "./AgreementSection";
import { MobileBottomBar } from "./MobileBottomBar";
import { AuthModalContent } from "./AuthModalContent";
import type { CartErrors } from "../types";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { useRegisterStore } from "@/features/auth/store/register.store";

interface CartSummaryProps {
  totalPrice: number;
  onBeforeNext?: () => boolean; // false dönerse ödeme durur
  onNext: (wantsInvoice: boolean) => void;
}

export function CartSummary({
  totalPrice,
  onBeforeNext,
  onNext,
}: CartSummaryProps) {
  const emailInputRef = useRef<HTMLDivElement>(null);
  const agreementRef = useRef<HTMLDivElement>(null);
  const discountFormRef = useRef<HTMLDivElement>(null);

  const [discount, setDiscount] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [wantsInvoice, setWantsInvoice] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentView, setCurrentView] = useState<AuthView>("login");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [wantsAccount, setWantsAccount] = useState(false);

  const user = useAuthStore((state) => state.user);

  const {
    isAuthOpen,
    setIsAuthOpen,
    isMobile,
    errors,
    setErrors,
    handlePaymentProcess,
    loginHook,
  } = useOrderAuth(email, isAgreed, () => onNext(wantsInvoice));

  const resetRegisterStore = useRegisterStore((state) => state.reset);

  const finalPrice = totalPrice - (discount || 0);

  const scrollToDiscount = () => {
    discountFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    discountFormRef.current?.querySelector("input")?.focus();
  };

  const enhancedHandlePayment = () => {
    if (onBeforeNext && !onBeforeNext()) return;
    if (!user?.email && !email) {
      emailInputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return handlePaymentProcess();
    }
    if (!isAgreed) {
      agreementRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return handlePaymentProcess();
    }
    if (wantsAccount) {
      resetRegisterStore();
      useRegisterStore.getState().updateFormData({ email });
      setShowRegisterModal(true);
      return;
    }
    handlePaymentProcess();
  };

  const handleAuthClose = () => {
    setIsAuthOpen(false);
    setCurrentView("login");
  };

  const authModalTitle =
    currentView === "login" ? "Zaten bir hesabınız var mı?" : "Şifre Sıfırlama";

  const authBottomSheetTitle =
    currentView === "login" ? "Zaten hesabınız var mı?" : "Şifremi Unuttum";

  return (
    <div className="flex flex-col gap-4 pb-28 lg:pb-0 z-10">
      <div className="flex flex-col gap-4 p-6 bg-(--bg-neutral-primary-soft) border border-(--border-default) rounded-(--radius-base)">
        {!user?.email && (
          <EmailSection
            email={email}
            setEmail={setEmail}
            errors={errors}
            setErrors={setErrors}
            emailInputRef={emailInputRef}
            agreementRef={agreementRef}
            wantsAccount={wantsAccount}
            onCreateAccountChange={setWantsAccount}
          />
        )}

        <div className="space-y-4">
          <PriceSummary
            totalPrice={totalPrice}
            finalPrice={finalPrice}
            discount={discount}
            className="hidden lg:block"
          />

          <Button
            variant="brand"
            text="Ödemeye Devam Et"
            onClick={enhancedHandlePayment}
            className="w-full hidden lg:flex py-4"
          />

          <AgreementSection
            isAgreed={isAgreed}
            setIsAgreed={setIsAgreed}
            wantsInvoice={wantsInvoice}
            setWantsInvoice={setWantsInvoice}
            errors={errors}
            setErrors={setErrors}
            agreementRef={agreementRef}
          />
        </div>
      </div>

      <div
        ref={discountFormRef}
        className="p-6 bg-(--bg-neutral-primary-soft) border border-(--border-default) rounded-(--radius-base)"
      >
        <DiscountCodeForm onApply={(amount) => setDiscount(amount)} />
      </div>

      <MobileBottomBar
        totalPrice={totalPrice}
        finalPrice={finalPrice}
        discount={discount}
        onPayment={enhancedHandlePayment}
        onScrollToDiscount={scrollToDiscount}
      />

      {isMobile ? (
        <BottomSheet
          isOpen={isAuthOpen}
          onClose={handleAuthClose}
          title={authBottomSheetTitle}
        >
          <div className="p-6 pb-12">
            <AuthModalContent
              currentView={currentView}
              setCurrentView={setCurrentView}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              email={email}
              errors={errors as CartErrors}
              loginHook={loginHook}
            />
          </div>
        </BottomSheet>
      ) : (
        <Modal
          open={isAuthOpen}
          onClose={handleAuthClose}
          title={authModalTitle}
          size="sm"
        >
          <div className="py-2">
            <AuthModalContent
              currentView={currentView}
              setCurrentView={setCurrentView}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              email={email}
              errors={errors as CartErrors}
              loginHook={loginHook}
            />
          </div>
        </Modal>
      )}
      {isMobile ? (
        <BottomSheet
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          title="Hesap Oluştur"
        >
          <div className="p-6 pb-12">
            <RegisterForm onSuccess={() => setShowRegisterModal(false)} />
          </div>
        </BottomSheet>
      ) : (
        <Modal
          open={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          title="Hesap Oluştur"
          size="md"
        >
          <RegisterForm onSuccess={() => setShowRegisterModal(false)} />
        </Modal>
      )}
    </div>
  );
}
