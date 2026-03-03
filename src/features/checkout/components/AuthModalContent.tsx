"use client";
import { useEffect } from "react";
import { Button, Input } from "@/components/common";
import { Envelope, Eye, EyeSlash, Lock } from "flowbite-react-icons/outline";
import { Google } from "flowbite-react-icons/solid";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { AuthView } from "@/features/auth/auth.types";
import type { Dispatch, SetStateAction } from "react";
import type { CartErrors } from "../types";
import type { useOrderAuth } from "../hooks/useOrderAuth";

type UseLoginHook = ReturnType<typeof useOrderAuth>["loginHook"];

interface AuthModalContentProps {
  currentView: AuthView;
  setCurrentView: Dispatch<SetStateAction<AuthView>>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  email: string;
  errors: CartErrors;
  loginHook: UseLoginHook;
}

export function AuthModalContent({
  currentView,
  setCurrentView,
  showPassword,
  setShowPassword,
  email,
  errors,
  loginHook,
}: AuthModalContentProps) {
  // email prop'u değiştiğinde loginHook'un formData'sını handleChange üzerinden güncelle
  useEffect(() => {
    if (email && loginHook.formData.email !== email) {
      const syntheticEvent = {
        target: { value: email },
      } as React.ChangeEvent<HTMLInputElement>;
      loginHook.handleChange("email")(syntheticEvent);
    }
  }, [email]); // eslint-disable-line react-hooks/exhaustive-deps
  if (currentView === "forgot-password") {
    return (
      <div className="animate-in fade-in duration-300">
        <ForgotPasswordForm onBack={() => setCurrentView("login")} />
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
            onChange={loginHook.handleChange("email")}
            onBlur={loginHook.handleBlur("email")}
            onClear={loginHook.handleClear("email")}
            aria-invalid={
              loginHook.touched.email ? !!errors.email : undefined
            }
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
            type={showPassword ? "text" : "password"}
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
            onChange={loginHook.handleChange("password")}
            onBlur={loginHook.handleBlur("password")}
            aria-invalid={
              loginHook.touched.password
                ? !!loginHook.errors.password
                : undefined
            }
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
            onClick={() => setCurrentView("forgot-password")}
            className="text-(--text-fg-brand) hover:underline text-sm transition-colors font-medium"
          >
            Şifremi unuttum
          </button>
        </div>
        <Button
          variant="brand"
          text={loginHook.isLoading ? "Giriş Yapılıyor... " : "Giriş Yap"}
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
}