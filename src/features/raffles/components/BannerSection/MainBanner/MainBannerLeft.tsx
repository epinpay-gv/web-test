import { Users } from "flowbite-react-icons/outline";
import Image from "next/image";

interface MainBannerLeftProps {
  data: number;
}
export default function MainBannerLeft({ data }: MainBannerLeftProps) {
  const cardData: { id: number; image: string; text: string }[] = [
    { id: 1, image: "/nav-bg.webp", text: "Ücretsiz Katılım" },
    { id: 2, image: "/nav-bg.webp", text: "Açık Katılım Listesi" },
    { id: 3, image: "/nav-bg.webp", text: "1234 Kazanan" },
  ];
  return (
    <div className="flex flex-col gap-6">
      {/* ACTIVE PARTICIPANTS */}
      <div className="flex gap-3">
        <Users />
        <p>Aktif Katılımcı</p> <div>{data}</div>
      </div>

      {/* TITLE */}
      <h1>Lorem ipsum dolor sit amet, Lorem ipsum </h1>

      {/* CARDS */}
      <div className="flex justify-between">
        {cardData.map((i) => (
          <div
            key={i.id}
            className="flex justify-between w-41 h-auto rounded py-2 px-3 gap-2"
            style={{
              background:
                "linear-gradient(263.8deg, #F9D697 0.55%, #FFE7DD 24.87%, rgba(191, 195, 210, 0) 89.38%, rgba(255, 219, 173, 0) 97.8%)",
            }}
          >
            <Image src={i.image} alt={i.text} width={120} height={120} />
            <p>{i.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
