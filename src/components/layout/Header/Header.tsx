import { ThemeToggle } from '@/features/theme/components/ThemeToggle';
import { Button } from '@/components/common/Button/Button';
import Image from "next/image";
import { SearchInput } from '@/features/search/index'
import { LocaleDropdown } from './components/LocaleDropdown';

export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-(--bg-neutral-secondary-soft) transition-colors">
      <div className="max-w-6xl w-full mx-auto px-4 py-4 flex justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <div className='flex items-center gap-2'>
            <div>

              <Image
                src="/image/header/white-logo.png"
                alt="Epinpay"
                width={30}
                height={30}
                className='h-6 w-auto sm:j-7 md:h-8'
              />
            </div>
            <div>

              <Image 
                src="/image/header/white-epinpay.png"
                alt="Epinpay"
                width={90}
                height={10}
                className='h-6 w-auto sm:j-7 md:h-8'
              />
            </div>
          </div>
          {/* Diğer header içerikleriniz */}
        </div>
        <div className="max-w-lg min-w-2/5">
          <div className="mx-auto">
            <SearchInput />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <LocaleDropdown />
          <ThemeToggle />
          <Button variant="secondary" text="Giriş Yap" />
          <Button variant="brand" text="Satıcı ol" />

        </div>
      </div>
    </header>
  );
}


