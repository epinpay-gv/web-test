'use client';

// components/ForgotPasswordForm.tsx

import { ArrowLeft } from 'flowbite-react-icons/outline';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { EmailStep } from './forgot-password/EmailStep';
import { SuccessStep } from './forgot-password/SuccessStep';
import { useTheme } from 'next-themes';
import Image from "next/image";

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const hook = useForgotPassword();
  const { formData, isSuccess, handleReset } = hook;
  const { resolvedTheme } = useTheme();
  const themeSuffix = resolvedTheme === "light" ? "black" : "white";
  const logoSrc = `/image/logos/epinpay-${themeSuffix}-sm.png`;

  return (
    <div className="w-full max-w-96 mx-auto">
      <div className='pb-8'>
        <Image
          src={logoSrc}
          alt="Epinpay"
          width={160}
          height={40}
          className="h-6 md:h-10 w-auto object-contain cursor-pointer"
          priority
        />
      </div>
      <div className="mb-8">        
        {!isSuccess && (
          <>
            <h2 className="text-(--text-heading) font-semibold text-xl mb-2">
              Şifreni unuttum
            </h2>
            <p className="text-(--text-body) font-normal text-sm leading-relaxed">
              Mail adresinizi girerek şifrenizi sıfırlayın.
            </p>
          </>
        )}
        {isSuccess && (
          <>
            <h2 className="text-(--text-heading) font-semibold text-xl mb-2">
              Bağlantı gönderdik, <br />mailinizi kontrol edin
            </h2>
            <p className="text-(--text-body) font-normal text-sm leading-relaxed">
              <span className='text-(--text-heading)'>{formData.email}</span> adresine <span className='text-(--text-heading)'>şifre yenileme bağlantısı</span> gönderdik. Bağlantıya giderek şifenizi yenileyebilirsiniz.
            </p>
          </>
        )}
      </div>

      {isSuccess ? (
        <SuccessStep
          email={formData.email}
          onBack={onBack}
          onRetry={handleReset}
        />
      ) : (
        <EmailStep hook={hook} onBack={onBack} />
      )}
    </div>
  );
}