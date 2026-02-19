
'use client';

import Image from 'next/image';
import { Button } from '@/components/common';
import { useRouter } from 'next/navigation';


export function EmptyCart() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-6 mt-8 justify-center text-center">
      <div className="relative w-64 h-64 mb-6">
        <Image
          src="/image/cart/empty-cart.png"
          alt="Sepetiniz Boş"
          fill
          className="object-contain"
          priority
        />
      </div>
        <div className='flex flex-col gap-3'>
            <h2 className="text-(--text-heading) text-xl font-bold">
                Sepetiniz boş
            </h2>
            
            <p className="text-(--text-heading) text-base mb-8 max-w-xs">
                Sepetinizde ürün bulunmamaktadır
            </p>
        </div>

      <Button
        variant="brand"
        text='Ana Sayfaya Git'
        arrows={{ right: true }}
        onClick={() => router.push('/')}
        arrowSize='14'
        className='max-w-33.75 gap-1 text-xs'
        padding='xs'
      />
    </div>
  );
}