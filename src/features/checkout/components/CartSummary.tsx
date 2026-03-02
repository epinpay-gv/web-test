"use client";
import { Button, CheckBox, Input, Modal, BottomSheet } from "@/components/common";
import { Envelope, Eye, EyeSlash, Lock } from "flowbite-react-icons/outline";
import { DiscountCodeForm } from "./DiscountCodeForm";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useOrderAuth } from "../hooks/useOrderAuth";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { AuthView } from "@/features/auth/auth.types";
import { useRouter } from "next/navigation";
import { Google } from "flowbite-react-icons/solid";

interface CartSummaryProps {
  totalPrice: number;
  onNext: (wantsInvoice: boolean) => void;
}

export function CartSummary({ totalPrice, onNext }: CartSummaryProps) {
  const [discount, setDiscount] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [wantsInvoice, setWantsInvoice] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const {
    isAuthOpen,
    setIsAuthOpen,
    isMobile,
    errors,
    setErrors,
    handlePaymentProcess,
    loginHook,
  } = useOrderAuth(email, isAgreed, () => onNext(wantsInvoice));

  const finalPrice = totalPrice - (discount || 0);

  const renderAuthContent = () => {
    if (currentView === 'forgot-password') {
      return (
        <div className="animate-in fade-in duration-300">
          <ForgotPasswordForm onBack={() => setCurrentView('login')} />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-6 animate-in fade-in duration-300">
        <div className="border-b border-(--border-default) pb-5">
          <p className="text-(--text-body) text-sm">
            Bu mail ile eşleşen bir hesap var. <br />
            Şifre girerek devam edebilirsiniz.
          </p>
        </div>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            loginHook.formData.email = email; 
            loginHook.handleSubmit(e);
          }} 
          className="flex flex-col gap-4"
        >
          <div className="space-y-4">
            <label className="text-(--text-heading) text-sm font-medium">
              Email <span className="text-(--text-fg-danger">*</span>
            </label>
            <Input
              type="text"
              name="email"
              placeholder="Email adresini girin"
              leftIcon={<Envelope />}
              value={loginHook.formData.email}
              onChange={loginHook.handleChange('email')}
              onBlur={loginHook.handleBlur('email')}
              onClear={loginHook.handleClear('email')}
              aria-invalid={loginHook.touched.email ? !!errors.email : undefined}
              inputSize="base"
              disabled={loginHook.isLoading}
            />
            {loginHook.touched.email && errors.email && (
              <span className="text-(--text-fg-danger-strong) text-xs font-medium">
                {errors.email}
              </span>
            )}
            <label className="text-(--text-heading) text-sm font-medium">
              Şifre <span className="text-(--text-fg-danger">*</span>
            </label>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              leftIcon={<Lock />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none flex items-center justify-center"
                >
                  {showPassword ? (
                    <Eye className="input-right-icon" />
                  ) : (
                    <EyeSlash className="input-right-icon" />
                  )}
                </button>
              }
              value={loginHook.formData.password}
              onChange={loginHook.handleChange('password')}
              onBlur={loginHook.handleBlur('password')}
              aria-invalid={loginHook.touched.password ? !! loginHook.errors.password : undefined}
              inputSize="base"
              disabled={loginHook.isLoading}
            />
            {loginHook.touched.password && loginHook.errors.password && (
              <span className="text-(--text-fg-danger-strong) text-xs font-medium">
                {loginHook.errors.password}
              </span>
            )}          
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={loginHook.formData.rememberMe}
                onChange={loginHook.handleRememberMe}
                disabled={loginHook.isLoading}
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 accent-(--text-fg-brand) cursor-pointer"
              />
              <span className="text-(--text-body) text-sm group-hover:text-white transition-colors">
                Beni hatırla
              </span>
            </label>

            <button
              type="button"
              onClick={() => setCurrentView('forgot-password')}
              className="text-(--text-fg-brand) hover:underline text-sm transition-colors font-medium"
            >
              Şifremi unuttum
            </button>
          </div>
          <Button
            variant="brand"
            text={loginHook.isLoading ? 'Giriş Yapılıyor... ' : 'Giriş Yap'}
            type="submit"
            disabled={loginHook.isLoading}
            className="w-full py-3 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
          />
           <button
              type="button"
              disabled={loginHook.isLoading}
              onClick={loginHook.handleGoogleLogin}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-(--radius-base) border border-(--border-default-medium) bg-white/5 hover:bg-white/10 text-(--text-body) text-sm font-medium transition-colors disabled:opacity-50"
            >
              <Google className="w-5 h-5" />
              Google ile Giriş Yap
            </button>
        </form>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 p-6 bg-(--bg-neutral-primary-soft) border border-(--border-default) rounded-(--radius-base)">
        {!user?.email && (
          <div className="flex flex-col gap-4 border-b border-(--border-default) pb-4 ">
            <p className="text-(--text-heading) text-sm mb-2">
              E-posta adresinizi girin. Siparişinizi göndermek için e-posta adresinize ihtiyacımız var.
            </p>
            
            <Input
              placeholder="Email adresinizi girin"
              leftIcon={<Envelope size={16}  className="z-10"/>}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email !== undefined)
                  setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              aria-invalid={errors.email === true ? true : undefined}
            />
            {errors.email === true && (
              <p className="text-xs leading-5 text-(--text-fg-danger-strong) animate-in fade-in">
                Doldurulması zorunlu alan
              </p>
            )}

            <div className="flex items-start gap-2.5">
              <CheckBox className="w-4 h-4" />
              <p className="text-xs">Bu mail ile hesap oluştur. Avantajlardan faydalan</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {discount && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center border-b border-(--border-default) pb-2">
                <span className="text-(--text-body) ">Ürünler</span>
                <span className="text-(--text-body) ">₺{totalPrice}</span>
              </div>              
              <div className="flex justify-between items-center border-b border-(--border-default) pb-2">
                <span className="text-(--text-body)">İndirim</span>
                <span className="text-(--text-body)">₺{discount}</span>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <span className="text-(--text-heading) ">Toplam</span>
            <span className="text-(--text-heading) ">₺{finalPrice}</span>
          </div>

          <Button variant="brand" text="Ödemeye Devam Et" onClick={handlePaymentProcess} className="w-full" />

          <div className="mt-4 flex flex-col gap-3">

            <div className="flex items-start gap-2">
              <CheckBox
                checked={isAgreed}
                onCheckedChange={(checked: boolean) => {
                  setIsAgreed(checked);
                  if (errors.agreement !== undefined)
                    setErrors((prev) => ({ ...prev, agreement: undefined }));
                }}
                className={cn(
                  "w-4 h-4 mt-1 transition-colors",
                  errors.agreement === true && "border-(--border-danger-subtle) bg-(--bg-danger-soft)"
                )}
              />
              <p className="text-xs leading-4 text-(--text-heading)">
                Ödemeye Devam Et butonuna tıklayarak{" "}
                <span className="text-(--text-fg-brand) font-medium underline cursor-pointer">
                  Mesafeli Satış Sözleşmesini
                </span>{" "}
                onaylıyorum.
              </p>
            </div>
            {errors.agreement === true && (
              <p className="text-xs leading-5 text-(--text-fg-danger-strong) animate-in fade-in">
                Doldurulması zorunlu alan
              </p>
            )}
            {/* Logic & UI: Fatura İstiyorum Alanı */}
            <div className="flex gap-2">
              <CheckBox
                id="wantsInvoice"
                checked={wantsInvoice}
                onCheckedChange={(checked: boolean) => setWantsInvoice(checked)}
                className="w-4 h-4 transition-colors"
              />
              <label htmlFor="wantsInvoice" className="text-xs leading-4 text-(--text-heading)">
                Fatura istiyorum
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* --- RESPONSIVE AUTH --- */}
      {isMobile ? (
        <BottomSheet 
          isOpen={isAuthOpen} 
          onClose={() => { setIsAuthOpen(false); setCurrentView('login'); }} 
          title={currentView === 'login' ? "Zaten hesabınız var mı?" : "Şifremi Unuttum"}
        >
          <div className="p-6 pb-12">{renderAuthContent()}</div>
        </BottomSheet>
      ) : (
        <Modal 
          open={isAuthOpen} 
          onClose={() => { setIsAuthOpen(false); setCurrentView('login'); }} 
          title={currentView === 'login' ? "Zaten bir hesabınız var mı?" : "Şifre Sıfırlama"} 
          size="sm"
        >
          <div className="py-2 ">{renderAuthContent()}</div>
        </Modal>
      )}

      <div className="p-6 bg-(--bg-neutral-primary-soft) border border-(--border-default) rounded-(--radius-base)">
        <DiscountCodeForm onApply={(amount) => setDiscount(amount)} />
      </div>
    </div>
  );
}