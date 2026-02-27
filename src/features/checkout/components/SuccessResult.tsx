"use client";
import { ProductCard } from "@/components/common";
import { useOrderDetails } from "../hooks/useOrderDetails";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary"; 
import { SellerDetail } from "./SellerDetail";
import { ProductCardOrientation } from "@/components/common/Cards/ProductCard/types";

export function SuccessResult({ orderId }: { orderId: string }) {
  const { order } = useOrderDetails(orderId);
  
  if (!order) return <div>Sipariş bulunamadı.</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 ">
     
      {JSON.stringify(order)}
      <div className="text-center">
        
      </div>

      <div className="lg:grid lg:grid-cols-2 gap-8">
        {/* Ürün Listesi */}
        <div className="bg-(--bg-neutral-primary-soft) border border-[#1D303A] relative z-90 rounded-xl p-6">
          <h3 className="mb-4 font-semibold border-b text-(--text-body) border-[#1D303A] pb-2">Ürünler</h3>
          {order.products.map((item) => (            
            <div key={item.id} className="border-b border-[#1D303A] py-4 last:border-0">
              <ProductCard
                key={item.id}
                product={item }  
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

        <div className="flex flex-col gap-4">
          <OrderSummary 
            orderId={order.order_id}
            date={order.date}
            payMethod={order.payment_method}            
          />
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