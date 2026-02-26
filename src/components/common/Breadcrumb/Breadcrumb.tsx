import BreadCrumbItem from "./BreadCrumbItem";
import { BreadcrumbItemType } from "@/types/types";

interface BreadcrumbProps {
  items: BreadcrumbItemType[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="inline-flex items-center gap-2 my-4 overflow-x-auto scrollbar-hide">
      {items.map((item, index) => (
        <BreadCrumbItem
          key={item.href}
          isLast={index === items.length - 1}
          data={item}
        />
      ))}
    </div>
  );
}
