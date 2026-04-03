"use client";
import { usePathname } from "next/navigation";
import { NavMenu } from "@/components/layout";

const HIDDEN_PATHS = ["/checkout"];

export function NavMenuWrapper() {
  const pathname = usePathname();
  const isHidden = HIDDEN_PATHS.some((path) => pathname.includes(path));

  if (isHidden) return null;
  return <NavMenu />;
}