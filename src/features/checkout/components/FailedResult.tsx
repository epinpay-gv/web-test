"use client";
import { Button } from "@/components/common";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function FailedResult() {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center gap-4 justify-baseline min-h-screen text-center animate-in zoom-in-95 duration-500">
      <div className="pt-6">
        <Image
          src={"/image/cart/failed-payment.png"}
          alt="failed payment"
          fill
          className="max-w-62.5 max-h-41.5 relative!" 
        />
      </div>
      <div className="flex flex-col gap-3 max-w-87.75">
        <h2 className="text-xl text-(--text-fg-warning-subtle) leading-7 font-semibold"> Ödeme Başarısız </h2>
        <p className="font-normal text-(--text-heading)">Ödeme alınamadı, ödeme yönteminizi kontrol ettikten sonra tekrar deneyiniz.</p>
      </div>
      <div>
        <Button variant="brand" text="Sepete geri dön" className="max-w-fit" onClick={() => router.push("/checkout") }/>
      </div>
    </div>
  );
}
