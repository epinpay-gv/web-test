'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/common';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface RaffleFailedPageProps {
  error?: string;
}

export default function RaffleFailedPage({ error }: RaffleFailedPageProps) {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-4xl w-full bg-(--bg-neutral-primary-soft) rounded-(--radius-base) overflow-hidden border border-white/5 shadow-2xl">
        <div className="p-8 md:p-16 flex flex-col items-center justify-center text-center space-y-8">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="relative w-40 h-40"
          >            
            {/* Hata durumunda farklı bir görsel veya kırmızı tonlu bir illüstrasyon */}
            <div className="w-full h-full flex items-center justify-center bg-red-500/10 rounded-full border-4 border-red-500/20">
               <AlertCircle size={80} className="text-(--text-fg-danger-strong) opacity-80" />
            </div>
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-xl leading-7 font-semibold text-(--text-fg-danger-strong)">İşlem Başarısız Oldu</h1>
            <p className="text-(--text-heading) font-normal text-sm mx-auto max-w-md">
              {error || "Çekilişiniz oluşturulurken bir hata meydana geldi. Ödeme onaylanmamış olabilir veya sistemde geçici bir sorun yaşanmış olabilir."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full pt-4">
            <Button 
              variant="brand" 
              onClick={() => router.push("/create-raffle")} 
              iconLeft={<RefreshCw size={16} />}
              text="Tekrar Dene" 
              padding="md"
            />                                        
            <Button 
              variant="secondary" 
              onClick={() => router.push("/")} 
              text="Ana Sayfaya Git" 
              padding="md"
            />                  
          </div>
          
          <p className="text-xs text-gray-500">
            Sorun devam ederse lütfen destek ekibiyle iletişime geçin.
          </p>
        </div>
      </div>
    </div>
  );
}
