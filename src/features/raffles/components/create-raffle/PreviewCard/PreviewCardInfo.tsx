"use client";
import { SHIMMER_CLASS } from "./preview.utils";

interface PreviewCardInfoProps {
  title: string;
  isLoading: boolean;  
  isPrizeLoading: boolean;    
  timeLeft: string;        
  isTimeLoading?: boolean;  
  prizeValue?: number;     
  participantCount?: number;
  amount: number; 
}

export default function PreviewCardInfo({ 
  title, 
  isLoading,
  isPrizeLoading, 
  timeLeft, 
  isTimeLoading = false,
  prizeValue = 0,
  participantCount = 0,
  amount = 0
}: PreviewCardInfoProps) {
  
  return (
    <div className="flex flex-col flex-1 px-3 py-4 md:px-4 md:py-6 gap-2 md:gap-4 text-white">
            
      <div className="h-10.5">
        {isLoading ? (
          <div className="space-y-1">
            <div className={`w-full h-4 ${SHIMMER_CLASS} rounded-sm`} />
            <div className={`w-3/4 h-4 ${SHIMMER_CLASS} rounded-sm`} />
          </div>
        ) : (
          <p className="text-(--text-heading) text-sm font-semibold leading-[150%] line-clamp-2">
            {title}
          </p>
        )}
      </div>
      
      <div className="flex items-center justify-between w-full px-2">
  
        <div className="flex flex-col gap-0 items-center flex-1">
          <p className="text-[10px] md:text-xs text-(--text-body) leading-[150%]">Ödül Değeri</p>
          {isPrizeLoading? (
            <div className={`w-10 h-3.5 mt-1 ${SHIMMER_CLASS} rounded-xs`} />
          ) : (
            <p className="text-sm font-bold leading-[150%] text-(--text-fg-success-strong)">
              {amount} $
            </p>
          )}
        </div>

        <div className="w-px h-6 bg-(--border-default-medium) opacity-50" />

        <div className="flex flex-col gap-0 items-center flex-1">
          <p className="text-[10px] md:text-xs text-(--text-body) leading-[150%]">Katılımcı</p>
          {isPrizeLoading ? (
            <div className={`w-10 h-3.5 mt-1 ${SHIMMER_CLASS} rounded-xs`} />
          ) : (
            <p className="text-sm font-bold leading-[150%] text-(--text-fg-brand-subtle)">
              {participantCount} Kişi
            </p>
          )}
        </div>
      </div>
  
      <div className="w-full h-13 md:h-14 mt-auto cursor-pointer text-xs font-base rounded-lg py-1 px-3 bg-(--bg-brand) shadow-xs flex flex-col gap-0.5 items-center justify-center transition-transform active:scale-95">
        <p className="text-(--text-black) leading-5 text-xs font-medium">Hemen katıl</p>
        
        <div className="min-w-20 flex justify-center rounded-sm py-0.5 px-2 bg-(--bg-brand-soft) text-(--text-fg-brand) leading-4">
          {isTimeLoading || timeLeft === "-" ? (
            <div className={`w-14 h-3 ${SHIMMER_CLASS} opacity-40 rounded-xs`} />
          ) : (
            <span className="whitespace-nowrap font-bold text-[11px]">Son {timeLeft}</span>
          )}
        </div>
      </div>

    </div>
  );
}