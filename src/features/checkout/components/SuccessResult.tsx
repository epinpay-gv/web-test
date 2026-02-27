"use client";
import { useOrderDetails } from "../hooks/useOrderDetails";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary"; 

export function SuccessResult({ orderId }: { orderId: string }) {
  const { order } = useOrderDetails(orderId);
  
  if (!order) return <div>Sipariş bulunamadı.</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
     
      {JSON.stringify(order)}
      <div className="text-center">
        
      </div>

      <div className="lg:grid lg:grid-cols-2 gap-8">
        <div className="">        
          {/* ÜRÜN LİSTESİ */}
          <div className="bg-[#0F222E] border border-[#1D303A] rounded-xl p-6">
            <h3 className="mb-4 font-semibold border-b border-[#1D303A] pb-2">Satın Alınan Ürünler</h3>
            {order.products.map(product => (
              <div key={product.id} className="flex justify-between items-center py-3">
                <div className="flex items-center gap-4">                  
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.quantity} Adet</p>
                  </div>
                </div>
                <p className="font-semibold">₺{product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          {order.invoice && (
            <div className="bg-[#0F222E] border border-[#1D303A] rounded-xl p-6">
              <h3 className="mb-4 font-semibold text-(--text-fg-brand)">Fatura Bilgileri</h3>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                  <p className="text-gray-500">Ad Soyad</p>
                  <p>{order.invoice.name} {order.invoice.surname}</p>
                </div>
                <div>
                  <p className="text-gray-500">Ülke / Şehir</p>
                  <p>{order.invoice.country}, {order.invoice.city}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="">
          <OrderSummary 
            date={order.order_id}
            orderId={order.date}
            payMethod={order.payment_method}
            
          />
        </div>
      </div>
    </div>
  );
}