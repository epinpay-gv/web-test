import { Button } from "@/components/common";
import { CloseCircle } from "flowbite-react-icons/outline";

interface Props {
  onNext: () => void;
  onCancel?: () => void;
  onPrev?:() => void;
  disabled?: boolean
  editMode?: boolean
}

export const PrizeButtonSection = ({ onNext, onCancel, onPrev, disabled, editMode }: Props) => (
  <div className="flex justify-center gap-2 pt-4  border-(--border-default)">
    {!editMode &&
      <Button
      variant="secondary"
      text="İptal et"
      iconLeft={<CloseCircle size={13.33} />}
      onClick={onCancel}
      padding="sm"
      className="max-w-fit text-sm"
      />
    }
    <Button 
      variant="secondary"
      text="Önceki"
      onClick={onPrev}
      padding="sm"
      className="max-w-fit text-sm"
    />
    <Button
      variant="brand"
      onClick={onNext}
      text={editMode ? "Güncellemeleri Yayınla" : "Sonraki"}
      padding="sm"
      className="max-w-fit text-sm"
      disabled={disabled}
    />
  </div>
);