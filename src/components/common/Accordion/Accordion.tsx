"use client";
import { cloneElement, Children, ReactNode, useState} from "react";

type AccordionType = "single" | "multiple";
type AccordionTheme = "light" | "dark";

interface AccordionProps {
  children: ReactNode;
  type?: AccordionType;
  theme?: AccordionTheme;
  className?: string;
}

const BASE_ACCORDION_CLASS = "w-full";
const ACCORDION_THEME_CLASSES: Record<AccordionTheme, string> = {
  light: "bg-(--bg-neutral-primary-soft) rounded-lg p-4",
  dark: "bg-(--bg-neutral-secondary) rounded-lg p-4",
};

export default function Accordion({
  children,
  type = "single",
  theme = "dark",
  className,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (type === "single") {
      setOpenIndex(prev => (prev === index ? null : index));
    } else {
      setOpenIndexes(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    }
  };

  return (
    <div
      className={`
        ${BASE_ACCORDION_CLASS}
        ${ACCORDION_THEME_CLASSES[theme]}
        ${className ?? ""}
      `}
    >
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          index,
          isOpen:
            type === "single"
              ? openIndex === index
              : openIndexes.includes(index),
          onToggle: toggleItem,
        })
      )}
    </div>
  );
}
