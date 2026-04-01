import { formatDateTR } from "@/lib/utils";
import { BalanceHistory } from "../../user.types";

interface BalanceHistoryDataProps{
    data: BalanceHistory;
}

export default function BalanceHistoryData({data} : BalanceHistoryDataProps) {
  return (
        <div className="bg-(--bg-neutral-primary) border border-(--border-default) rounded-lg py-4 px-8 flex items-center justify-between">
          <div className="flex flex-col gap-0 text-sm">
            <p className="font-semibold">{data.method}</p>
            <p className="font-medium text-(--text-body)">{formatDateTR(data.date)}</p>
          </div>
          <div className="font-semibold">{data.currency} {data.amount}</div>
        </div>
  );
}
