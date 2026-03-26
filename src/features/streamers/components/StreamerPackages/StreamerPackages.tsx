"use client";
import { Button } from "@/components/common";
import { Packages } from "../../streamers.types";
import PackageCard from "./PackageCard";
import { useRouter } from "next/navigation";

interface StreamerPackagesProps {
  data: Packages[];
  selectedPackage: string;
  onClick: (id: string) => void;
}

export default function StreamerPackages({
  data,
  selectedPackage,
  onClick,
}: StreamerPackagesProps) {
  const router = useRouter();

  return (
    <section
      className="relative w-full rounded-full p-10 md:py-20 md:px-50 overflow-hidden"
      style={{
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(16, 78, 105, 0.4) 10%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0) 60%, rgba(16, 78, 105, 0.4) 90%, rgba(255, 255, 255, 0.4) 100%)`,
        // mixBlendMode: "screen",
      }}
    >
      {/* GRADIENT BORDER */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          padding: "2px",
          background: `linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0) 50%, rgba(255, 255, 255, 0.3) 100%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* BG TEXTURE */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url('/raffles-page/banner-with-light-texture.webp')`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          mixBlendMode: "soft-light",
          opacity: 0.3,
        }}
      />
      {/* CONTENT*/}
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-4xl text-center font-bold">Yayıncı Ligleri</h2>
        <h3>
          Hedeflerinizi gerçekleştirin, ödülleri toplayın ve yayıncı liginde üst
          sıralara tırmanın.
        </h3>
        <div className="max-w-5xl flex md:flex-row flex-col gap-2">
          {data.map((item) => (
            <PackageCard
              key={item.id}
              data={item}
              isOpen={selectedPackage === item.id}
              onClick={onClick}
            />
          ))}
        </div>
        <Button
          variant="white"
          text="Yayıncı ol, Aramıza katıl"
          className="max-w-50"
          onClick={() => router.push("/streamers/application")}
        />
      </div>
    </section>
  );
}
