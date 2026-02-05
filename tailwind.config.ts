
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Buraya özel CSS değişkenlerini (var(--bg-brand)) bağlayabilirsin
      }
    },
  },
  plugins: [],
};

export default config;