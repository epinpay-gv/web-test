import { ThemeToggle } from '@/features/theme/components/ThemeToggle';
import { Button } from '@/components/common/Button/Button';

export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            My App
          </h1>
          {/* Diğer header içerikleriniz */}
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button text="Giriş Yap" color='secondary'  onClick={() => alert("Giriş Yap Tıklandı")} />
          <Button text="Satıcı Ol" color='brand' onClick={() => alert("Satıcı Ol Tıklandı")}/>
        </div>
      </div>
    </header>
  );
}