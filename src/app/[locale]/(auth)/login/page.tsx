import { LoginForm } from "@/features/auth/components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex justify-between overflow-hidden bg-[linear-gradient(0deg,#00BBE5_-79.91%,rgba(0,187,229,0)_55.11%)] dark:bg-slate-950 transition-colors duration-300">
      <div className="flex w-full justify-center p-16 z-10">
        <LoginForm />
      </div>
      <div className="max-lg:hidden relative max-w-fit w-full h-screen dark:opacity-80 z-10">
        <Image 
          src="/image/login/login-right.png" 
          alt="Epinpay" 
          className="object-cover" 
          width={480} 
          height={1024} 
          priority
        />
      </div>
    </div>
  );
}