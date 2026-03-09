"use client";
import { Button, ProductCard } from "@/components/common";
import { useOrderDetails } from "../hooks/useOrderDetails";
import { OrderSummary } from "./OrderSummary";
import { SellerDetail } from "./SellerDetail";
import { ProductCardOrientation } from "@/components/common/Cards/ProductCard/types";
import Image from "next/image";

export function SuccessResult({ orderId }: { orderId: string }) {
  const { order } = useOrderDetails(orderId);
  
  if (!order) return <div>Sipariş bulunamadı.</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 px-4 lg:px-0 pb-4">  

      <div className="flex flex-col gap-6 items-center pt-6">
        <Image src="/image/cart/success-payment.png" alt="success payment" fill className="max-w-62.5 max-h-41.5 relative!" />
        <h2 className="text-xl text-(--text-fg-success-strong) ">Ödeme Başarılı</h2>  
        <div className="text-center flex flex-col items-center">
          <p className="max-w-100 text-(--text-heading) leading-5 text-center">
          Ödeme alındı, 
          <span className="font-semibold">{" " + order.user_info.email + " "}</span>
          adresine aşağıda özeti gösterilen ürünler teslim edilecektir.</p>   
          {!order.user_info.is_guest && 
          <div className="flex flex-col gap-3 items-center">
            <p> 
              Ayrıca
              <span className="text-(--text-fg-brand)">
                Üye Paneli {">"} Siparişlerim
              </span>
              bölümünden de ürünlerinize ulaşabilirsiniz
            </p>
            <Button variant="brand" text="Siparişlerim" className="max-w-fit"/>
          </div>
          }     
          
        </div>      
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 ">        
        <div className="order-1 lg:col-start-2 lg:row-start-1">
          <OrderSummary 
            orderId={order.order_id}
            date={order.date}
            payMethod={order.payment_method}            
          />
        </div>
        <div className="order-2 lg:col-start-1 lg:row-span-2 bg-(--bg-neutral-primary-soft) border border-[#1D303A] relative z-90 rounded-xl p-6 h-fit">
          <h3 className="mb-4 font-semibold border-b text-(--text-body) border-[#1D303A] pb-2">Ürünler</h3>
          {order.products.map((item) => (            
            <div key={item.id} className="border-b border-[#1D303A] py-4 last:border-0">
              <ProductCard
                product={item}  
                orientation={ProductCardOrientation.HORIZONTAL}
                isReadOnly={true} 
                isInCart={true}                 
                addToCart={() => {}}
                notifyWhenAvailable={() => {}}
                addToFavorites={() => {}}
                changeQuantity={() => {}}            
              />
            </div>
          ))}
        </div>                
        <div className="order-3 lg:col-start-2 lg:row-start-2">
          <SellerDetail
            address="Osmangazi Mah. Bayraklı / İzmir Sicil No: 2315416"
            email="info@epinpay.com"
            phone="+90 554 111 11 11"
          />
        </div>

      </div>
          </div>
  );
}
