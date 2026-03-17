import { Input } from "@/components/common/Form";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";

interface TopupInfoFormProps {
  isLoading?: boolean;
}

export function TopupInfoForm({ isLoading = false }: TopupInfoFormProps) {
  const { topupValue, setTopupValue } = useCatalogStore();

  const handleClear = () => {
    setTopupValue("");
  };

  return (
    <div className="w-full">
      <Input
        value={topupValue}
        onChange={(e) => setTopupValue(e.target.value)}
        onClear={handleClear}
        placeholder="Lütfen bilginizi giriniz"
      />
    </div>
  );
}
