import { OrderProduct } from "../../user.types";
import {
  getItemDisplayStatus,
  ITEM_DISPLAY_COLORS,
  ITEM_DISPLAY_LABELS,
} from "../../utils/status.mappers";

interface CardStatusProps {
  product: OrderProduct;
}
export default function CardStatus({ product }: CardStatusProps) {
  const displayStatus = getItemDisplayStatus(product.status);
  const statusLabel = ITEM_DISPLAY_LABELS[displayStatus];
  const statusColor = ITEM_DISPLAY_COLORS[displayStatus];

  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-(--text-body)">Sipariş durumu</span>
      <span className={`font-medium ${statusColor}`}>{statusLabel}</span>
    </div>
  );
}
