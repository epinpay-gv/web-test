"use client";
import { useUserMe } from "@/features/user/hooks/useUserMe";
import { useWallet } from "@/features/user/hooks/useWallet";
import BalanceHistoryData from "@/features/user/components/balance/BalanceHistoryData";

export default function BalanceClient() {
  const { data: userMe, isLoading: userMeLoading } = useUserMe();
  const currencyId = userMe?.wallet?.currencyId ? String(userMe.wallet.currencyId) : "";
  const { depositHistory, isLoading: walletLoading } = useWallet(currencyId);

  if (userMeLoading || walletLoading) return null; // TODO: skeleton
  if (depositHistory.length === 0) return null;

  return (
    <div className="space-y-2">
      {depositHistory.map((item) => (
        <BalanceHistoryData key={item.id} data={item} />
      ))}
    </div>
  );
}
