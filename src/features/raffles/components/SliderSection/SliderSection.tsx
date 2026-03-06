import { SliderSectionData } from "../../raffle.types";
import RaffleCarousel from "./RaffleCarousel";
import Title from "./Title";

interface SliderSectionProps {
  data: SliderSectionData;
}
export default function SliderSection({ data }: SliderSectionProps) {
  return (
    <section className="w-full p-20">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <Title title={data.title} />
        <RaffleCarousel data={data.raffles} />
      </div>
    </section>
  );
}
