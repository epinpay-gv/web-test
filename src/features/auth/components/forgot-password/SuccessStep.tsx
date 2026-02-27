'use client';

// components/forgot-password/SuccessStep.tsx

import { CheckCircle } from 'flowbite-react-icons/outline';
import { Button } from '@/components/common';
import { useTranslations } from 'next-intl';

interface SuccessStepProps {
  email: string;
  onBack: () => void;
  onRetry: () => void;
}

export function SuccessStep({ email, onBack, onRetry }: SuccessStepProps) {
  const tBtn = useTranslations('common.buttons');

  return (
    <div className="bg-(--bg-neutral-primary-soft) p-6 rounded-(--radius-base) border border-(--border-default) text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">       
      <Button 
        variant='secondary' 
        text={tBtn('resend')}
        onClick={() => onRetry}
      />
    </div>
  );
}