"use client";
import { Button } from "@/components/common";
import { Plus } from "flowbite-react-icons/outline";
import { useRouter } from "next/navigation";
import { useUserMe } from "@/features/user/hooks/useUserMe";

export default function BalanceBox() {
  const router = useRouter();
  const { data, isLoading } = useUserMe();

  const balance = data?.wallet?.balance ?? "-";
  const currency = data?.wallet?.currencyName ?? "";

  return (
    <div
      className="p-6 space-y-2 border border-(--border-dark) rounded-xl"
      style={{
        background: `
          linear-gradient(
            var(--bg-neutral-primary-medium),
            var(--bg-neutral-primary-medium)
          ),
          radial-gradient(
            80.99% 80.99% at 19.01% 71.68%,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(102, 102, 102, 0.2) 100%
          )
        `,
      }}
    >
      {/* USER INFO */}
      <div className="flex justify-between items-end">
        <div className="flex gap-2 items-center border-b border-(--border-default)">
          <div className="leading-[150%] space-y-2">
            <p className="text-sm">Bakiyeniz : </p>
            <p className="text-2xl font-bold">
              {isLoading ? "..." : `${currency} ${balance}`}
            </p>
          </div>
        </div>

        {/* AMOUNT */}
        <Button
          text="Bakiye yükle"
          variant="brand"
          padding="sm"
          className="max-w-36 text-sm font-medium gap-1 py-1!"
          iconLeft={<Plus size={14} />}
          onClick={() => router.push("/balance")}
        />
      </div>
    </div>
  );
}
