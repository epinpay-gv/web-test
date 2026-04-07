
import PreviewCard  from "./PreviewCard/PreviewCard"
import { RaffleFormData } from "../../raffle.types";
import { motion } from "framer-motion";

export function GiveawayPreview({ data }: { data: RaffleFormData }) {
  return (
    <div className="w-full h-full min-screen rounded-[40px] flex items-start justify-center px-8 pb-8 pt-30 transition-all duration-700">
      <motion.div 
        layout
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-orange-900/20 blur-[100px] rounded-full" />
        
        <PreviewCard data={data} />
      </motion.div>
    </div>
  );
}