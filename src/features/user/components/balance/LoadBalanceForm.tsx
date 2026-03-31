"use client";
import { Input } from "@/components/common";

interface LoadBalanceFormProps {
  amountToLoad: string;
  onInputChange: (
    amountToLoad: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LoadBalanceForm({
  amountToLoad,
  onInputChange,
}: LoadBalanceFormProps) {
  return (
    <div className="flex justify-between bg-(--bg-neutral-primary-medium) py-4 px-6 gap-4 border border-(--border-dark) rounded-xl">
      {/* USER INFO */}
      <div></div>
      
      {/* AMOUNT */}
      <div>
        <p>Yüklemek istediğiniz tutar</p>
        <Input
          type="text"
          name="name"
          value={amountToLoad}
          onChange={onInputChange(amountToLoad)}
          placeholder="$ 0"
        />
      </div>
    </div>
  );
}
