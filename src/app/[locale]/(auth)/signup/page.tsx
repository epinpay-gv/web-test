/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { RegisterForm } from "@/features/auth/components/RegisterForm";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-screen w-full bg-white dark:bg-slate-950" />;
  }

  return (    
    <div className="h-screen w-full flex justify-between overflow-hidden bg-(bg-variants-gray) dark:bg-slate-950 transition-colors duration-300 relative">
            
      <div 
        className="absolute pointer-events-none bg-[#F62F61] opacity-20 rounded-full"
        style={{
          width: '774px', 
          height: '664px',
          left: '-186px',
          top: '560px',    
          filter: 'blur(229px)',
          zIndex: 0,
        }}
      />

      <div className="flex w-full justify-center p-8 md:p-16 z-10 overflow-y-auto">
        <RegisterForm />
      </div>

      <div className="max-lg:hidden relative flex-shrink-0 w-[480px] h-screen dark:opacity-80 z-10">
        <Image 
          src="/image/login/login-right.png" 
          alt="Epinpay" 
          className="object-cover h-full w-full" 
          fill
          priority
        />
      </div>
    </div>
  );
}