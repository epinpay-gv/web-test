"use client"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { FooterColumnProps } from "../types" 

export const FooterColumn = ({ title, links, className }: FooterColumnProps) => {
  const router = useRouter()

  return (
    <div className={cn("space-y-4 relative z-10", className)}>
      <div className="font-bold text-lg text-black">{title}</div>
      <ul className="space-y-2 text-sm font-normal">
        {links.map((link, index) => (
          <li key={index}>
            <button
              onClick={() => router.push(link.href)}
              className="text-black  hover:underline cursor-pointer transition-all text-left block w-full outline-none"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}