"use client";

import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useRef } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function PageAnimate({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const prevThemeRef = useRef<string | undefined>(resolvedTheme);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    // İlk render'da flag'i false yap
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      prevThemeRef.current = resolvedTheme;
      return;
    }

    // Tema değiştiğinde güncelle
    prevThemeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  // Hydration aşamasında animasyon yok
  if (!resolvedTheme) {
    return <>{children}</>;
  }

  // İlk render'da animasyon yok
  // eslint-disable-next-line react-hooks/refs
  if (isFirstRenderRef.current) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={resolvedTheme}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}