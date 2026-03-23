'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import StatusState from '@/components/common/StatusState/StatusState';
import { Button } from '@/components/common';
import { useRouter } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('common.messages');
  const router = useRouter();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration hatasını önlemek için mounted kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const isDark = currentTheme === 'dark';

  const imageSrc = isDark 
    ? '/illustrations/404-not-found-smiley-dark.svg' 
    : '/illustrations/404-not-found-smiley.svg';

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100vh] w-full bg-white dark:bg-(--bg-neutral-primary-soft) p-6 overflow-hidden">
      {/* Arka Plan Parlama Efektleri */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--bg-brand)] opacity-10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="z-10 w-full max-w-lg">
        <StatusState
          image={imageSrc}
          title={t('notFoundTitle')}
          description={t('notFoundDesc')}
          actions={
            <Button
              text={t('backToHome')}
              variant="brand"
              padding="sm"
              size="lg"
              textSize="sm"
              onClick={() => router.push("/")}
              className="w-full sm:w-auto min-w-[200px]"
            />
          }
        />
      </div>

      <div className="absolute bottom-8 text-[var(--text-body-subtle)] text-sm opacity-50">
        404 - {t('notFoundTitle')}
      </div>
    </div>
  );
}
