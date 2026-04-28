
import {RaffleFormData, RafflePrize } from "../raffle.types";
import { Raffle, RaffleType } from "@/types/types";

const mapTypeToFormType = (apiType: RaffleType): "free" | "ep" | "coupon" => {
  switch (apiType) {
    case RaffleType.FREE: 
      return "free";
    case RaffleType.EP: 
      return "ep";
    case RaffleType.COUPON: 
      return "coupon";
    default:
      return "free"; 
  }
};

export const mapRaffleToFormData = (raffle: Raffle): RaffleFormData => {  
  const mappedPrizes = (raffle.rewards || []).map((reward): RafflePrize => {
    const prizeImage =
      reward.image ||
      reward.product?.imageUrl ||
      "/images/placeholder-product.webp";

    const prizePrice = reward.value
      ? parseFloat(reward.value.replace(/[^0-9.-]+/g, ""))
      : reward.product?.price || 0;

    return {
      id: reward.id,
      productId: reward.productId || "",
      offerId: reward.offerId || "",
      name: reward.name,
      image: prizeImage,
      count: reward.quantity,
      totalStock: reward.quantity,
      price: prizePrice,
    };
  });
  const totalCalculatedAmount = mappedPrizes.reduce((total, prize) => {
    const unitPrice = prize.price ?? 0; 
    return total + (unitPrice * prize.count);
  }, 0);
  return {
    title: raffle.title,
    description: raffle.description || "",
    startDate: raffle.startDate,
    endDate: raffle.endDate,
    type: mapTypeToFormType(raffle.type),
    amount: raffle.epCost || totalCalculatedAmount,
    
    prizeCount: raffle.productCount || mappedPrizes.length || 0,
    winnerCount: mappedPrizes.reduce((acc, curr) => acc + curr.count, 0) || 0,
    backupCount: 0,
    reserveCount: 0,
    constraint: raffle.constraint,
    prizes: mappedPrizes,
    currencyId: raffle.currencyId || 3,
  };
};