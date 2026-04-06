import { Button } from "@/components/common";
import { CloseCircle } from "flowbite-react-icons/outline";

interface Props {
  onNext: () => void;
  onCancel?: () => void;
  disabled?: boolean
}

export const ButtonsSection = ({ onNext, onCancel, disabled }: Props) => (
  <div className="flex justify-center gap-2 pt-6  border-(--border-default)">
    <Button
      variant="secondary"
      text="İptal et"
      iconLeft={<CloseCircle size={13.33} />}
      padding="sm"
      className="max-w-fit text-sm"
      onClick={onCancel}
    />
    <Button
      variant="secondary"
      onClick={onNext}
      text="Sonraki Adım"
      padding="sm"
      className="max-w-fit text-sm"
      disabled={disabled}
    />
  </div>
);