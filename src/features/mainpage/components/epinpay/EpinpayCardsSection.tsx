import { Button } from "@/components/common";
import Image from "next/image";

interface EpinpayCardsSectionProps {
  data?: string;
}

export default function EpinpayCardsSection({}: EpinpayCardsSectionProps) {
  const data = [
    {
      name: "Top-up",
      description:
        "Top-up işlemlerinde genellikle doğrudan hesabınıza bakiye yükleme işlemini ifade eder.",
      image: "/mainpage/top-up.webp",
    },
    {
      name: "E-pin",
      description:
        "Oyun içi bakiye veya içerik satın almak için kullanılan dijital koddur.",
      image: "/mainpage/e-pin.webp",
    },
    {
      name: "Key",
      description:
        "Bir oyunu etkinleştirmek ve doğrulamak için kullanılan benzersiz bir alfasayısal koddur",
      image: "/mainpage/key.webp",
    },
  ];

  return (
    <section
      className="w-full relative overflow-hidden py-10 md:py-20 px-4 md:px-10 "
      style={{ backgroundImage: "url('/mainpage/epinpay-section-bg.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* İÇERİK */}
      <div className="flex flex-col items-center space-y-6 max-w-5xl mx-auto">
        {/* TITLE */}
        <div className="space-y-1 text-center">
          <p className="text-lg font-medium leading-[150%]">Epinpay&apos;de</p>
          <p className="text-2xl font-bold leading-[150%]">Neler var?</p>
        </div>

        {/* CARDS */}
        <div className="md:flex gap-4 space-y-2">
          {data.map((i, index) => (
            <div
              key={index}
              className="overflow-hidden relative flex-1 flex flex-col justify-between p-6 h-60 md:h-105 rounded-lg bg-(--bg-neutral-primary-strong)"
            >
              <div className="space-y-4 z-1">
                <p className="text-2xl font-bold leading-[150%]">{i.name}</p>
                <p className="text-sm leading-[150%]">{i.description}</p>
              </div>
              <div className="max-w-28 z-1">
                <Button
                  variant="white"
                  text={`${i.name} satın al`}
                  padding="xs"
                  className="text-xs font-semibold"
                />
              </div>
              <Image
                src={i.image}
                alt={i.name}
                width={261}
                height={318}
                className="absolute bottom-0 right-0 z-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
