'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';
import { Button } from '@/components/common';
import { RaffleCard } from '@/components/common'; // Gönderdiğin yeni bileşen
import { Raffle } from "@/types/types";
import { toast } from 'react-toastify';
import { Instagram } from 'flowbite-react-icons/solid';
import { FaTiktok } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface RaffleSuccessPageProps {
  raffleId: string;
}

export default function RaffleSuccessPage({ raffleId }: RaffleSuccessPageProps) {
  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  useEffect(() => {    
    const fetchRaffleDetails = async () => {
      try {
        const res = await fetch(`/api/raffles/${raffleId}`);
        const data = await res.json();
        setRaffle(data);
      } catch (err) {
        console.error("Raffle fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (raffleId) fetchRaffleDetails();
  }, [raffleId]);

  const copyToClipboard = () => {
    const url = `${window.location.origin}/raffles/${raffleId}`;
    navigator.clipboard.writeText(url);
    toast.success("Bağlantı kopyalandı!");
  };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#060b10] flex items-center justify-center text-white">
//         <div className="animate-pulse flex flex-col items-center gap-4">
//           <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
//           <p>Çekiliş bilgileri hazırlanıyor...</p>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen bg-[#060b10] flex items-center justify-center p-4 md:p-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 bg-[#0d121a] rounded-(--radius-base) overflow-hidden border border-white/5 shadow-2xl">
        
        
        <div className="p-8 md:p-16 flex flex-col items-center justify-center text-center space-y-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative w-40 h-40"
          >            
            <Image 
              src="/raffles-page/succes-create-raffle.png" 
              alt="Success"
              fill
              className="object-contain"
            />
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-xl leading-7 font-semibold text-(--text-fg-success-strong) ">
              Çekilişiniz yayınlandı
            </h1>
            <p className="text-(--text-heading) font-normal text-sm mx-auto">
              Çekilişiniz yayına alınmıştır. Katılımcıları ve diğer detayları Kullanıcı Paneli 
              <Link href="/profile/raffles" className="text-cyan-400 font-medium hover:underline mx-1">
                &quot;Çekilişlerim&quot;
              </Link> 
              bölümünden takip edebilirsin. Çekiliş sosyal medya hesaplarınızdan duyurmak için aşağıdaki bağlantısı kullanabilirsiniz.
            </p>
          </div>

          <div className="flex  justify-center gap-3 w-full">
            <Button 
              variant="secondary" 
              onClick={copyToClipboard}              
              iconLeft={<Copy size={14}  />}
              text="Bağlantıyı kopyala"
              className='max-w-fit max-h-fit text-xs'
              padding='xs'
            />                                    
            <Button 
              variant="secondary"               
              iconLeft={<Instagram size={14}  />}
              text="Instagramda paylaş"
              className='max-w-fit max-h-fit text-xs'
              padding='xs'
            />                  
            <Button 
              variant="secondary" 
              iconLeft={<FaTiktok size={14} />}            
              text="Tiktok'ta Paylaş"
              className='max-w-fit max-h-fit text-xs'
              padding='xs'
            />                                        
          </div>
          
        <Button 
            variant='brand' 
            onClick={() => router.push("/")}
            text="Ana Sayfaya Git"
            arrows={{right: true, left: false}}
            padding='xs'
            className='max-w-fit max-h-fit'
        />                        
        </div>

        <div 
            className="flex items-center justify-center p-12 relative"
            style={{background: "var(--bg-raffle-orange-gradient)"}}
        >
          

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
            {raffle && (
              <RaffleCard 
                card={raffle}
                type="special"
                orientation="vertical"
              />
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}