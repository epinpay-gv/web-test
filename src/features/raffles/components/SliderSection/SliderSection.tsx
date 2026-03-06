import { SliderSectionData } from "../../raffle.types";
import RaffleCarousel from "./RaffleCarousel";
import Title from "./Title";

interface SliderSectionProps {
  data: SliderSectionData;
}
export default function SliderSection({ data }: SliderSectionProps) {
  return (
    <section className="w-full p-20 bg-[url('/raffles-page/raffle-slider-bg.webp')] bg-cover bg-center">
      {/* <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(164.42deg, #FFE26C 4.59%, #FF8A4C 51.01%, #FFE26C 97.42%)",
          opacity: 0.85,
        }}
      /> */}
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <Title title={data.title} />
        <RaffleCarousel data={data.raffles} />
      </div>
    </section>
  );
}
