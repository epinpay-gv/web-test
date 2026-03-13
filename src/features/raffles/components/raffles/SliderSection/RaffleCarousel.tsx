import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RaffleCard } from "@/components/common";
import { Raffle } from "@/components/common/Cards/RaffleCard/types";

interface RaffleCarouselProps {
  isLoading?: boolean;
  data: Raffle[];
  showControls?: boolean;
  loop?: boolean;
  onCardClick?: (card: Raffle) => void;
  type?: "special" | "default";
}
export default function RaffleCarousel({
  isLoading,
  data,
  showControls,
  loop,
  onCardClick,
  type= "special"
}: RaffleCarouselProps) {
    
  return (
    <Carousel
      opts={{
        align: "start",
        loop: loop,
      }}
      className="w-full py-5"
    >
      <CarouselContent className="-ml-4">
        {data?.map((item) => (
          <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-auto">
            <RaffleCard card={item} onCardClick={onCardClick} type={type} isLoading={isLoading}/>
          </CarouselItem>
        ))}
      </CarouselContent>
      {showControls && (
        <>
          <CarouselPrevious className="hidden md:flex bg-(--bg-quaternary-medium) border-none" />
          <CarouselNext className="hidden md:flex bg-(--bg-quaternary-medium) border-none " />
        </>
      )}
    </Carousel>
  );
}
