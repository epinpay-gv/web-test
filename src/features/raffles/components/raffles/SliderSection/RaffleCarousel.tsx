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
  data: Raffle[];
  showControls?: boolean;
  loop?: boolean;
  onCardClick?: (card: Raffle) => void;
}
export default function RaffleCarousel({
  data,
  showControls,
  loop,
  onCardClick,
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
        {data.map((item) => (
          <CarouselItem key={item.id} className="pl-4 basis-auto">
            <RaffleCard card={item} onCardClick={onCardClick}/>
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
