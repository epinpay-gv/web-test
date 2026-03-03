"use client";
import { Button, DropdownMenu } from "@/components/common";
import { DropdownMenuItem } from "@/components/common/Dropdown/dropdown.types";
import { AngleDown } from "flowbite-react-icons/outline";

interface FilterDropdownContainerProps {
  title?: string;
  icon?: React.ReactNode;
  selectedId: string;
  items: DropdownMenuItem[];
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

  const itemsWithState = items.map((item) => ({
    ...item,
    active: item.id === selectedId,
  }));

  return (
    <div className="flex flex-col gap-1">
      <DropdownMenu
        title={"Sırala"}
        trigger={
          <Button
            padding="sm"
            textSize="sm"
            variant="secondary"
            icon={icon ?? <AngleDown size={10} />}
            text={`Sırala (${selectedItem?.text})`}
            className="truncate"
          />
        }
        items={itemsWithState}
        onSelect={(item) => { onSelect(item.id)}}
      />
    </div>
  );
}
