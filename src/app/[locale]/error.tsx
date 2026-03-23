'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import StatusState from '@/components/common/StatusState/StatusState';
import { Button } from '@/components/common';
import { useRouter } from '@/i18n/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common.messages');
  const router = useRouter();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Hata bir servise loglanabilir
    console.error('Server Error:', error);
  }, [error]);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const isDark = currentTheme === 'dark';

  const imageSrc = isDark 
    ? '/illustrations/laptop-server-error-dark.svg' 
    : '/illustrations/laptop-server-error.svg';

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100vh] w-full bg-white dark:bg-(--bg-neutral-primary-soft) p-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500 opacity-5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="z-10 w-full max-w-lg">
        <StatusState
          image={imageSrc}
          title={t('errorTitle')}
          description={t('errorDesc')}
          actions={
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                text={t('tryAgain')}
                variant="brand"
                padding="sm"
                size="lg"
                textSize="sm"
                onClick={() => reset()}
                className="w-full sm:w-auto min-w-[160px]"
              />
              <Button
                text={t('backToHome')}
                variant="secondary"
                padding="sm"
                size="lg"
                textSize="sm"
                onClick={() => router.push('/')}
                className="w-full sm:w-auto min-w-[160px]"
              />
            </div>
          }
        />
      </div>

      <div className="absolute bottom-8 text-[var(--text-body-subtle)] text-sm opacity-50">
         500 - {t('errorTitle')}
      </div>
    </div>
  );
}
