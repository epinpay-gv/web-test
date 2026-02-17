import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BoxWrapperProps<T extends ElementType> = {
  as?: T;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">;

export default function BoxWrapper<
  T extends ElementType = "section"
>({
  as,
  title,
  children,
  className,
  contentClassName,
  ...props
}: BoxWrapperProps<T>) {
  const Component = as || "section";

  return (
    <Component
      className={cn("space-y-4 ", className)}
      {...props}
    >
      {title && (
        <h3 className="text-[20px] font-medium text-(--text-heading)">
          {title}
        </h3>
      )}

      <div className={cn("bg-(--bg-neutral-primary-soft) border border-(--border-default) rounded-(--radius-base) p-6", contentClassName)}>
        {children}
      </div>
    </Component>
  );
}
