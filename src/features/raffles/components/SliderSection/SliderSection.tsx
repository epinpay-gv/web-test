import { SliderSectionData } from "../../raffle.types";
import RaffleCarousel from "./RaffleCarousel";
import Title from "./Title";

interface SliderSectionProps {
  data: SliderSectionData;
  isBg?: boolean;
}
export default function SliderSection({ data, isBg = true }: SliderSectionProps) {
  return (
    <section className={`w-full p-4 md:p-20  ${isBg ? "bg-[url('/raffles-page/raffle-slider-bg.webp')] bg-cover bg-center" : ""}`}>
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <Title title={data.title} />
        <RaffleCarousel data={data.raffles} />
      </div>
    </section>
  );
}
