import { Order } from "@/features/user/user.types";
import OrderCard from "./OrderCard";

interface OrdersSectionProps {
  orders: Order[];
}

export default function OrdersSection({ orders }: OrdersSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
