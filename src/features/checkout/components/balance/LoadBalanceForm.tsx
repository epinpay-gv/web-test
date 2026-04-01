"use client";
import { Button, Input } from "@/components/common";

interface LoadBalanceFormProps {
  amountToLoad: string;
  currency: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAmountSelect: (amount: string) => void; // ← new
}

export function LoadBalanceForm({
  amountToLoad,
  currency,
  onInputChange,
  onAmountSelect,
}: LoadBalanceFormProps) {
  // TODO : Bu datalar dinamik alınacak
  const userData = {
    firstName: "İlsu",
    lastName: "sunal",
    email: "ilsusunal@gmail.com",
    referralCode: "",
    isEmailVerified: false,
  };

  const initials =
    userData.firstName && userData.lastName
      ? `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase()
      : userData.email[0];

  const readyToUseAmounts = ["10", "50", "100", "200", "500"];

  return (
    <div className="space-y-4">
      {/* BOX */}
      <div className="bg-(--bg-neutral-primary-medium) py-4 px-6 space-y-2 border border-(--border-dark) rounded-xl">
        {/* USER INFO */}
        <div className="flex justify-between">
          <div className="flex gap-2 items-center border-b border-(--border-default)">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-(--bg-neutral-tertiary) text-(--text-body) font-semibold text-sm">
              {initials}
            </div>

            {userData.firstName && userData.lastName && (
              <div>
                {userData.firstName} {userData.lastName}
              </div>
            )}
          </div>
          <p className="text-sm leading-[150%]">Yüklemek istediğiniz tutar</p>
        </div>

        {/* AMOUNT */}
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Bakiyeniz : <span className="font-bold">$ 253,3</span>
          </div>
          <div className="max-w-42">
            <Input
              type="text"
              name="name"
              value={`${currency} ${amountToLoad}`}
              onChange={onInputChange}
              placeholder="$ 0"
              className="bg-(--bg-neutral-tertiary) py-0 text-(--text-fg-brand) text-center"
            />
          </div>
        </div>
      </div>

      {/* AMOUNT BUTTONS */}
      <div className="flex gap-2">
        {readyToUseAmounts.map((i, index) => (
          <Button
            key={index}
            text={`${currency}${i}`}
            onClick={() => onAmountSelect(i)} // ← pass the button's own value
            className="font-medium rounded-xl"
            padding="sm"
          />
        ))}
      </div>
    </div>
  );
}
