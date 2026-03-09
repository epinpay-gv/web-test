import Link from "next/link";
import { SliderSectionData } from "../../raffle.types";
import RaffleCarousel from "./RaffleCarousel";

interface SliderSectionProps {
  data: SliderSectionData;
  isBg?: boolean;
}
export default function SliderSection({
  data,
  isBg = true,
}: SliderSectionProps) {
  return (
    <section
      className={`w-full p-4 md:p-20  ${isBg ? "bg-[url('/raffles-page/raffle-slider-bg.webp')] bg-cover bg-center" : ""}`}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-2xl font-semibold">{data.title}</h2>
          <Link href="/all-raffles" className="text-(--text-fg-brand) text-sm hover:underline">Tümünü gör</Link>
        </div>
        <RaffleCarousel data={data.raffles} />
      </div>
    </section>
  );
}
