"use client";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "flowbite-react-icons/outline";
import { Button, IconShape } from "@/components/common";

function subscribe() {
  return () => {};
}

function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true, // client
    () => false, // server
  );
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useHydrated();

  if (!mounted) {
    return (
      <div className="lg:w-7 lg:h-7 w-6 h-6 bg-gray-700 rounded-full animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      name="Theme"
      aria-label="Theme"
      variant="ghost"
      appearance="filled"
      padding="sm"
      className="border-none! focus:ring-0"
      icon={
        isDark ? (
          <Moon className="md:w-5 md:h-5 w-4 h-4 transition-colors" />
        ) : (
          <Sun className="md:w-5 md:h-5 w-4 h-4 transition-colors" />
        )
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
    />
  );
}
