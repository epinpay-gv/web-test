"use client";

import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 } 
  },
};

export default function PageAnimate({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const pathname = usePathname(); // Sayfa değişimlerini takip etmek için
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <motion.div
      key={`${theme}-${pathname}`} // Hem tema hem sayfa değişince tetiklenir
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}