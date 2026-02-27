import { formatDateTR } from "@/lib/utils"
interface OrderSummaryProps {
    orderId: string,
    date: Date | string,
    payMethod: string
}

export function OrderSummary({orderId, date, payMethod} : OrderSummaryProps) {
   
    return(
        <div className="bg-(--bg-neutral-primary-soft) border border-[#1D303A] rounded-(--radius-base) relative p-6">
            <div className="border-b border-[#1D303A] pb-2">
                <p className="text-(--text-body) font-medium">Ödeme Özeti</p>
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
                <div className="w-full flex justify-between">
                    <p>Sipariş Numarası</p>
                    <p>{orderId}</p>
                </div>
                <div className="w-full flex justify-between">
                    <p>Tarih</p>
                    <p>{date ? formatDateTR(date) : "-" }</p>
                </div>
                <div className="w-full flex justify-between">
                    <p>Ödeme Yöntemi</p>
                    <p>{payMethod}</p>
                </div>
            </div>
        </div>
    )
}