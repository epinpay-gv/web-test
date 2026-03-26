/* eslint-disable @next/next/no-img-element */
import { Users } from "flowbite-react-icons/outline";
import Image from "next/image";

interface MainBannerProps {
  data: number;
}
export default function MainBanner({ data }: MainBannerProps) {
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
    <div
    className="overflow-hidden relative"
      style={{
        backgroundColor: "#FF8A4C",
        backgroundImage: `linear-gradient(263.8deg, #F9D697 0.55%, #FFE7DD 24.87%, rgba(191, 195, 210, 0) 89.38%, rgba(255, 219, 173, 0) 97.8%)`,
        backgroundPosition: "left, right",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "100%, auto 100%",
      }}
    >
      <div className="relative max-w-5xl mx-auto py-4 md:py-10 h-70.25 md:h-auto overflow-hidden">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6 max-w-127.25 px-4 md:px-0 py-6">
          {/* ACTIVE PARTICIPANTS */}
          <div className="flex items-center gap-3 text-(--text-black) leading-[150%]">
            <Users size={24} />
            <p className="text-xs font-medium">Aktif Katılımcı</p>
            <div className="text-sm font-semibold">{data}</div>
          </div>

          {/* TITLE */}
          <h1 className="z-1 text-2xl md:text-3xl font-bold leading-[150%] bg-linear-to-br from-black to-[#FFE26C] bg-clip-text text-transparent">
            Lorem ipsum dolor sit amet, Lorem ipsum
          </h1>

          {/* CARDS */}
          <div className="hidden md:flex justify-between">
            {cardData.map((i) => (
              <div
                key={i.id}
                className="relative flex items-center justify-between w-41 rounded-lg gap-2 overflow-hidden "
                style={{
                  background:
                    "linear-gradient(263.8deg, #F9D697 0.55%, #FFE7DD 44.87%, #BFC3D200 89.38%, #FFDBAD00 97.8%)",
                  mixBlendMode: "hard-light",
                }}
              >
                {/* Base image */}
                <Image
                  src={i.image}
                  alt={i.text}
                  width={50}
                  height={50}
                  className="mix-blend-luminosity"
                />

                {/* Text  */}

                <p className="text-right text-(--text-black) text-sm font-medium py-2 px-3">
                  {i.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <img
          src="/raffles-page/main-banner-right-image.webp"
          alt="Main Banner Image"
          className="w-62 h-auto md:w-100 object-contain absolute right-0 -bottom-8 md:bottom-0 z-1"
        />
      </div>
      {/* BG TEXTURE */}
      <img
        src="/raffles-page/banner-brand-texture.svg"
        alt="Main Banner Image"
        className="w-80 md:w-160 h-auto object-contain absolute -right-16 md:right-0 bottom-0 md:-bottom-16 z-0 opacity-10"
      />
    </div>
  );
}
