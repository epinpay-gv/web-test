"use client";
import { Button, DropdownMenu } from "@/components/common";
import { DropdownMenuItem } from "@/components/common/Dropdown/dropdown.types";
import { AngleDown } from "flowbite-react-icons/outline";

interface FilterDropdownContainerProps {
  icon?: React.ReactNode;
  selectedId: string;
  items: DropdownMenuItem[];
  onSelect: (id: string) => void;
  align?: "left" | "right";
}

export default function FilterDropdownContainer({
  icon,
  selectedId,
  items,
  onSelect,
  align = "left"
}: FilterDropdownContainerProps) {
  const selectedItem = items.find((i) => i.id === selectedId);

  const itemsWithState = items.map((item) => ({
    ...item,
    active: item.id === selectedId,
  }));

  return (
    <div className="flex flex-col gap-1">
      <DropdownMenu
        trigger={
          <Button
            padding="sm"
            textSize="sm"
            variant="secondary"
            icon={icon ?? <AngleDown size={10} />}
            text={selectedItem?.text}
            className="truncate"
          />
        }
        items={itemsWithState}
        onSelect={(item) => { onSelect(item.id)}}
        align={align}
      />
    </div>
  );
}
