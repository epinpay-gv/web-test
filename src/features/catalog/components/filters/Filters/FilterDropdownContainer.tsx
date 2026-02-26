"use client";
import { Button, DropdownMenu } from "@/components/common";
import { AngleDown } from "flowbite-react-icons/outline";

interface FilterDropdownContainerProps {
  title?: string;
  icon?: React.ReactNode;
  selectedId: string;
  items: { id: string; text: string }[];
  onSelect: (id: string) => void;
}

export default function FilterDropdownContainer({
  title,
  icon,
  selectedId,
  items,
  onSelect,
}: FilterDropdownContainerProps) {
  const selectedItem = items.find((i) => i.id === selectedId);
  
  return (
    <div className="flex flex-col gap-1">
      {title && <p className="font-base text-sm leading-5 text-(--text-body)">{title}</p>}
      <DropdownMenu
        trigger={
          <Button
            padding="sm"
            textSize="sm"
            variant="secondary"
            icon={icon ?? <AngleDown size={10} />}
            text={selectedItem?.text ?? ""}
          />
        }
        items={items}
        onSelect={(item) => {
          onSelect(item.id);
        }}
      />
    </div>
  );
}
