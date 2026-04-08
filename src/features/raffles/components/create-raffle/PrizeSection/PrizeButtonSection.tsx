import { Button } from "@/components/common";
import { CloseCircle } from "flowbite-react-icons/outline";

interface Props {
  onNext: () => void;
  onCancel?: () => void;
  onPrev?:() => void;
  disabled?: boolean
}

export const PrizeButtonSection = ({ onNext, onCancel, onPrev, disabled }: Props) => (
  <div className="flex justify-center gap-2 pt-4  border-(--border-default)">
    <Button
      variant="secondary"
      text="İptal et"
      iconLeft={<CloseCircle size={13.33} />}
      onClick={onCancel}
      padding="sm"
      className="max-w-fit text-sm"
    />
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
      text="Sonraki"
      padding="sm"
      className="max-w-fit text-sm"
      disabled={disabled}
    />
  </div>
);