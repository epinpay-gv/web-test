'use client';

import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';
import { Button, RaffleCard } from '@/components/common';
import { useRaffle } from '../../../hooks/useRaffle';
import { toast } from 'react-toastify';
import { Instagram } from 'flowbite-react-icons/solid';
import { FaTiktok } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface RaffleSuccessPageProps {
  raffleId: string;
}

export default function RaffleSuccessPage({ raffleId }: RaffleSuccessPageProps) {
  const router = useRouter();

  const { raffle, isLoading } = useRaffle(raffleId);

  const copyToClipboard = () => {
    const url = `${window.location.origin}/raffles/${raffleId}`;
    navigator.clipboard.writeText(url);
    toast.success("Bağlantı kopyalandı!");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center ">
      <div className="max-w-7xl w-full h-full grid grid-cols-1 lg:grid-cols-2 bg-(--bg-neutral-primary-soft) rounded-(--radius-base) overflow-hidden border border-white/5 shadow-2xl">
        
        {/* SOL TARAF */}
        <div className="p-8 md:p-16 flex flex-col items-center justify-center text-center space-y-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative w-40 h-40">            
            <Image src="/raffles-page/succes-create-raffle.png" alt="Success" fill className="object-contain" priority />
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-xl leading-7 font-semibold text-(--text-fg-success-strong)">Çekilişiniz yayınlandı</h1>
            <p className="text-(--text-heading) font-normal text-sm mx-auto ">
              Çekilişiniz yayına alınmıştır. Katılımcıları ve diğer detayları 
              <Link href="/profile/raffles" className="text-(--text-fg-brand) font-medium hover:underline mx-1">&quot;Çekilişlerim&quot;</Link> 
              bölümünden takip edebilirsin.
            </p>
          </div>

          <div className="flex justify-center gap-3 w-full">
            <Button variant="secondary" onClick={copyToClipboard} iconLeft={<Copy size={14} />} text="Bağlantıyı kopyala" className='max-w-max max-h-fit text-xs' padding='xs' />                                        
            <Button variant="secondary" iconLeft={<Instagram size={14} />} text="Instagram'da paylaş" className='max-w-max max-h-fit text-xs' padding='xs' />                  
            <Button variant="secondary" iconLeft={<FaTiktok size={14} />} text="Tiktok'ta Paylaş" className='max-w-max max-h-fit text-xs' padding='xs' />                                                        
          </div>
          
          <Button variant='brand' onClick={() => router.push("/")} text="Ana Sayfaya Git" arrows={{right: true}} padding='xs' className='max-w-fit max-h-fit' />                        
        </div>

        {/* SAĞ TARAF */}
        <div className="flex items-center justify-center p-12 relative" style={{background: "var(--bg-raffle-orange-gradient)"}}>
          {isLoading ? (
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              {raffle && <RaffleCard card={raffle} type="special" orientation="vertical" />}
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}