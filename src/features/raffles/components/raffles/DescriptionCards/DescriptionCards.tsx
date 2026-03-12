import Image from "next/image";

type CardData = {
  id: number;
  textLine1: string;
  textLine2: string;
  textColor: string;
  image: string;
  bgColor: string;
  circleColor1: string;
  circleColor2: string;
  circleColor3: string;
};

interface DescriptionCardsProps {
  activeParticipantCount: number;
}

export default function DescriptionCards({
  activeParticipantCount,
}: DescriptionCardsProps) {
  const cardData: CardData[] = [
    {
      id: 1,
      textLine1: `${activeParticipantCount}`,
      textLine2: "Kazanan",
      textColor: "text-yellow-950",
      image: "/raffles-page/description-card-1.webp",
      bgColor: "bg-yellow-500",
      circleColor1: "bg-yellow-400",
      circleColor2: "bg-yellow-300",
      circleColor3: "bg-yellow-200",
    },
    {
      id: 2,
      textLine1: "Ücretsiz",
      textLine2: "Katılım",
      textColor: "text-green-950",
      image: "/raffles-page/description-card-2.webp",
      bgColor: "bg-green-500",
      circleColor1: "bg-green-400",
      circleColor2: "bg-green-300",
      circleColor3: "bg-green-200",
    },
    {
      id: 3,
      textLine1: "Açık Katılım",
      textLine2: "Listesi",
      textColor: "text-white",
      image: "/raffles-page/description-card-3.webp",
      bgColor: "bg-indigo-500",
      circleColor1: "bg-indigo-400",
      circleColor2: "bg-indigo-300",
      circleColor3: "bg-indigo-200",
    },
  ];

  return (
    <section className="flex flex-col md:flex-row gap-4 w-full max-w-5xl px-4 md:px-0">
      {cardData.map((i) => (
        <div
          key={i.id}
          className={`relative rounded-xl py-10 px-6 overflow-hidden h-45 md:h-82.75 w-full ${i.bgColor}`}
        >
          {/* IMAGE */}
          <Image
            src={i.image}
            alt={`${i.textLine1} ${i.textLine2}`}
            width={331}
            height={331}
            className="absolute z-10 object-cover h-60 w-60 md:w-82.75 md:h-82.75 bottom-0 right-0"
          />

          {/* TITLE */}
          <div
            className={`relative z-20 flex flex-col gap-1 text-2xl md:text-3xl leading-[150%] ${i.textColor}`}
          >
            <p className="font-extrabold">{i.textLine1}</p>
            <p className="font-semibold">{i.textLine2}</p>
          </div>

          {/* CIRCLES */}
          <div className={`absolute -right-1/2 -bottom-1/2 z-0 w-90.25 h-90.25 rounded-full ${i.circleColor1}`}></div>
          <div className={`absolute -right-1/2 -bottom-1/2 z-0 w-81 h-81 rounded-full ${i.circleColor2}`}></div>
          <div className={`absolute -right-1/2 -bottom-1/2 z-0 w-72 h-72 rounded-full ${i.circleColor3}`}></div>
        </div>
      ))}
    </section>
  );
}
