import { ElementType, ReactNode } from "react";

type ProductCardWrapperProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">;

export default function ProductCardWrapper<T extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: ProductCardWrapperProps<T>) {
  const Component = as || "div";

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}