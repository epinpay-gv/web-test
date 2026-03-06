import { Users } from "flowbite-react-icons/outline";
import Image from "next/image";

interface MainBannerLeftProps {
  data: number;
}
export default function MainBannerLeft({ data }: MainBannerLeftProps) {
  const cardData: { id: number; image: string; text: string }[] = [
    {
      id: 1,
      image: "/raffles-page/raffle-card-1.webp",
      text: "Ücretsiz Katılım",
    },
    {
      id: 2,
      image: "/raffles-page/raffle-card-2.webp",
      text: "Açık Katılım Listesi",
    },
    { id: 3, image: "/raffles-page/raffle-card-3.webp", text: "1234 Kazanan" },
  ];
  return (
    <div className="flex flex-col gap-6 max-w-127.25">
      {/* ACTIVE PARTICIPANTS */}
      <div className="flex items-center gap-3 text-(--text-black) leading-[150%]">
        <Users size={24}/>
        <p className="text-xs font-medium">Aktif Katılımcı</p> 
        <div className="text-sm font-semibold">{data}</div>
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold leading-[150%] bg-linear-to-br from-black to-[#FFE26C] bg-clip-text text-transparent">
        Lorem ipsum dolor sit amet, Lorem ipsum{" "}
      </h1>

      {/* CARDS */}
      <div className="flex justify-between">
        {cardData.map((i) => (
          <div
            key={i.id}
            className="flex justify-between w-41 h-auto rounded-lg py-2 px-3 gap-2"
            style={{
              background:
                "linear-gradient(263.8deg, #F9D697 0.55%, #FFE7DD 24.87%, rgba(191, 195, 210, 0) 89.38%, rgba(255, 219, 173, 0) 97.8%)",
            }}
          >
            <Image src={i.image} alt={i.text} width={50} height={50} className="mix-blend-luminosity"/>
            <p className="text-right text-(--text-black) text-sm font-medium">{i.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
