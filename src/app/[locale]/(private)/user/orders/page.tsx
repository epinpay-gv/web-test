import { mockOrders } from "@/mocks/user/orders.mock";
import OrdersClient from "./orders-client";

export default function OrdersPage() {
  return (
    <div>
      <OrdersClient 
        data={mockOrders} 
        pagination={{ current_page: 1, total_page: 1, count: mockOrders.length, per_page: 10, has_more: false }} 
      />
    </div>
  );
}