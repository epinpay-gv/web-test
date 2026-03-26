import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default function RootNotFound() {
  // Locale bulunmadığında varsayılan dile yönlendirir
  redirect(`/${routing.defaultLocale}`);
}
