import { Packages } from "../../streamers.types";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const LEAGUE_IMAGE_SRC: Record<number, string> = {
  1: "/streamers/level-1.webp",
  2: "/streamers/level-2.webp",
  3: "/streamers/level-3.webp",
  4: "/streamers/level-4.webp",
};

interface PackageCardProps {
  data: Packages;
  isOpen: boolean;
  onClick: (id: string) => void;
}

export default function PackageCard({
  data,
  isOpen = false,
  onClick,
}: PackageCardProps) {
  const isMobile = useIsMobile();

return (
  <motion.div
    layout
    initial={false}
    onClick={() => onClick(data.id)}
    animate={
      isMobile
        ? {
            height: isOpen ? "auto" : 120,
          }
        : {
            width: isOpen ? "100%" : 350,
          }
    }
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className={`cursor-pointer overflow-hidden rounded-lg p-4 flex flex-col md:flex-row gap-4 ${
      isOpen
        ? "bg-(--bg-brand-soft)"
        : "bg-(--bg-neutral-primary)"
    }`}
  >
    {/* LEFT / TOP SECTION */}
    <div className="relative w-full">
      <div className="flex flex-col gap-2 text-xl">
        <h3 className="font-semibold leading-5">{data.name}</h3>
        <p className="font-light text-(--text-body)">Yayıncı</p>
      </div>

      <motion.div
        layout
        animate={
          isMobile
            ? {
                y: isOpen ? 0 : 20,
                opacity: isOpen ? 1 : 0.6,
              }
            : {
                x: isOpen ? 0 : 40,
                opacity: isOpen ? 1 : 0.6,
              }
        }
        transition={{ duration: 0.4 }}
        className="absolute right-0 bottom-0"
      >
        <Image
          src={LEAGUE_IMAGE_SRC[data.order_rank]}
          alt={data.name}
          width={156}
          height={156}
          className="object-cover"
        />
      </motion.div>
    </div>

    {/* EXPANDABLE CONTENT */}
    <motion.div
      initial={false}
      animate={
        isMobile
          ? {
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 30, // mobile: bottom → top
            }
          : {
              opacity: isOpen ? 1 : 0,
              x: isOpen ? 0 : 50, // desktop: right → left
            }
      }
      transition={{ duration: 0.3 }}
      className={`flex flex-col md:flex-row gap-4 w-full ${
        isOpen ? "mt-4" : "pointer-events-none"
      }`}
    >
      {/* CRITERIA + REWARD */}
      <div className="flex flex-col justify-center gap-4 w-full">
        {data.detail_criteria.map((item) => (
          <div key={item.id}>
            <p className="text-(--text-body) text-sm font-medium leading-[150%]">
              {item.name} :
            </p>
            <p className="text-lg font-bold leading-[130%]">
              {item.value}
            </p>
          </div>
        ))}

        <div>
          <p className="text-(--text-body) text-sm font-medium leading-[150%]">
            Aylık Ödül
          </p>
          <p className="text-(--text-fg-yellow) text-lg font-bold leading-[130%]">
            {data.rewardMin}
            {data.rewardCurrenct} / {data.rewardMax}
            {data.rewardCurrenct}
          </p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="flex md:flex-col justify-center min-w-75 gap-4">
        <p className="text-lg font-bold leading-[130%]">
          Hedefler
        </p>
        <ul>
          {data.description.map((item, index) => (
            <li
              key={index}
              className="text-(--text-body) text-sm font-normal leading-[150%]"
            >
              - {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  </motion.div>
);
}
