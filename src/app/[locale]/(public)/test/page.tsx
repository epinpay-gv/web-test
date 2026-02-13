"use client";

import { useState, useMemo } from "react";
import { useTheme } from "next-themes"; // Zustand yerine bunu kullanıyoruz

import { ProgressBar } from "@/components/common/ProgressBar/ProgressBar";
import { Input } from "@/components/common/Form/Input/Input";




export default function TestPage() {
  const [password, setPassword] = useState("");
  const calculateStrength = useMemo(() => {
    if (password.length === 0) return 0;
    const hasUpperCase = /[A-Z]/.test(password);
    const someLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    let strength = 0;
    if (hasUpperCase && someLowerCase) strength += 25;
    if (hasNumber) strength += 25;
    if (hasSpecial) strength += 25;
    if (password.length >= 6) strength += 25;
    if (password.length < 6) {
      return Math.min(strength, 15);
    }

    return strength;
  }, [password]);
  return (
    <div className="min-h-screen gap-8 flex justify-center items-center transition-colors bg-white dark:bg-slate-900">
      <div className="p-10 bg-[#0B111D]  flex flex-col items-center justify-center gap-6">
      <div className="w-full max-w-xl space-y-4">
        <h2 className="text-white text-sm font-medium mb-2">Şifre Gücü Testi</h2>
        
        <Input
          type="password"
          placeholder="Şifrenizi girin..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />

        {/* Karakter yoksa ProgressBar hiç gözükmez */}
        {password.length > 0 && (
          <div className="mt-4">
            <ProgressBar 
              progress={calculateStrength} 
              variant="dynamic" 
              labelPosition="top"
              size="base"
            />
            <p className="text-[10px] text-slate-400 mt-2">
              {password.length < 6 
                ? "Şifre en az 6 karakter olmalıdır." 
                : "Şifre uzunluğu yeterli."}
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}