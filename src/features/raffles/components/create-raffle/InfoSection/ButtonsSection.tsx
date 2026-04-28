import { Button } from "@/components/common";
import { CloseCircle } from "flowbite-react-icons/outline";

import { useRouter } from "next/navigation";

interface Props {
  onNext: () => void;
  onCancel?: () => void;
  disabled?: boolean;
  editMode?: boolean;
  isUpdating?: boolean;
}

export const ButtonsSection = ({ onNext, onCancel, disabled, editMode, isUpdating }: Props) => {
  const router = useRouter();
  
  return (
    <div className="flex justify-center gap-2 pt-4  border-(--border-default)">
      <Button
        variant="secondary"
        text="İptal et"
        iconLeft={<CloseCircle size={13.33} />}
        padding="sm"
        className="max-w-fit text-sm"
        onClick={onCancel || (() => router.back())}
      />
      <Button
        variant="brand"
        onClick={onNext}
        text={editMode ? (isUpdating ? "Kaydediliyor..." : "Değişiklikleri Kaydet") : "Sonraki Adım"}
        padding="sm"
        className="max-w-fit text-sm"
        disabled={disabled}
      />
    </div>
  );
};