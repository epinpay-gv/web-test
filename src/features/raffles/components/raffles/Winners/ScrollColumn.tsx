import { formatDateTR } from "@/lib/utils";
import { Winner } from "../../../raffle.types";
import { motion } from "framer-motion";

export default function ScrollColumn({
  data,
  duration,
  className,
}: {
  data: Winner[];
  duration: number;
  className?: string;
}) {
  const looped = [...data, ...data];

  return (
    <div className={`overflow-hidden h-full ${className}`}>
      <motion.div
        className="flex flex-col gap-4"
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
        // Pause on hover
        whileHover={{ animationPlayState: "paused" }}
      >
        {looped.map((i, index) => (
          <div
            key={`${i.id}-${index}`}
            className={`text-yellow-950 rounded-xl flex justify-between p-4 shadow-sm w-67 shrink-0 ${
              index % 2 === 0 ? "bg-yellow-100" : "bg-yellow-200"
            }`}
          >
            <p>{i.name}</p>
            <p>{formatDateTR(i.date)}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}