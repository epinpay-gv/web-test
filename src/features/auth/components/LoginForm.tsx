"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/common/Form/Input/Input";
import { Button } from "@/components/common/Button/Button";
import { 
  Envelope, 
  Lock, 
  Eye, 
  EyeSlash 
} from "flowbite-react-icons/outline";
import { Google } from "flowbite-react-icons/solid";
import { authApi } from "../service";
import { useAuthStore } from "../store/auth.store";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Doldurulması zorunlu alan.");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      setAuth(res.user, res.token);
      router.push("/");
   } catch (err: unknown) {
    // 1. Durum: Eğer bu bir standart JavaScript Error objesi ise
    if (err instanceof Error) {
      setError(err.message);
    } 
    // 2. Durum: Eğer bu bir obje ise ve içinde 'message' string'i varsa
    else if (
      typeof err === "object" && 
      err !== null && 
      "message" in err && 
      typeof (err as { message: unknown }).message === "string"
    ) {
      setError((err as { message: string }).message);
    }   
    // 3. Durum: Hiçbiri değilse varsayılan bir mesaj
    else {
      setError("Beklenmedik bir hata oluştu!");
    }
  } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto z-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-3">Hesabına Giriş Yap</h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Fırsatlardan faydalanmak ve alışveriş yapmak için hemen üye ol ya da giriş yap.
        </p>
        <p className="mt-2 text-sm">
          <span className="text-gray-400">Hesabın yok mu? </span>
          <Link href="/register" className="text-cyan-400 hover:underline font-medium">Kayıt Ol</Link>
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {/* Email Input - Error State Eklenmiş */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white flex items-center gap-1">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            placeholder="Email adresinizi girin"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if(error) setError(null);
            }}
            leftIcon={<Envelope className={clsx("w-5 h-5", error ? "text-white" : "text-gray-500")} />}
            
            className="text-white placeholder:text-gray-600"
          />
          {error && (
            <span className="text-[11px] text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
              {error}
            </span>
          )}
        </div>

        {/* Şifre Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white flex items-center gap-1">
            Şifre <span className="text-red-500">*</span>
          </label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-5 h-5 text-gray-500" />}
            variant="innerButton"
            innerButton={
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-white px-3"
              >
                {showPassword ? <EyeSlash className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            }
            wrapperClassName="bg-[#161F28] border-gray-800 focus-within:border-cyan-500"
            className="text-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-700 bg-transparent text-cyan-500 focus:ring-0 ring-offset-0" />
            <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Beni hatırla</span>
          </label>
          <Link href="/forgot-password" title="Şifremi unuttum" className="text-xs text-cyan-400 hover:text-cyan-300">
            Şifremi unuttum
          </Link>
        </div>

        <div className="space-y-3 pt-2">
          <Button 
            type="submit" 
            variant="brand" 
            text={loading ? "Giriş yapılıyor..." : "Giriş Yap"} 
            className="w-full py-4 font-bold shadow-lg shadow-cyan-500/10" 
            disabled={loading}
          />
          <Button 
            type="button" 
            variant="dark" 
            appearance="filled"
            text="Google ile Giriş Yap" 
            icon={<Google className="w-5 h-5" />}
            className="w-full py-4 text-sm font-semibold bg-[#1C2630] border-none hover:bg-[#25313C]" 
          />
        </div>
      </form>
    </div>
  );
}