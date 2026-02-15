export type IconVariant = "circle" | "square";

export type IconColor = 
  | "green" 
  | "red" 
  | "brand" 
  | "yellow" 
  | "gray" 
  | "dark" 
  | "white" 
  | "custom";

export interface IconShapeProps {
  variant?: IconVariant;
  color?: IconColor;
  customColor?: string; // Örn: "#ff5500"
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  icon: React.ElementType; // Lucide veya Flowbite ikonu
  className?: string;
}
