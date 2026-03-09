/* ---------- Enums ---------- */

export enum RaffleType {
  FREE = "FREE",
  EP = "EP",
  COUPON = "COUPON",
  MIXED = "MIXED",
}

export enum RaffleStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  DRAWING = "DRAWING",
  DRAWN = "DRAWN",
  ANNOUNCED = "ANNOUNCED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum CreatorType {
  STORE = "STORE",
  PUBLISHER = "PUBLISHER",
  PLATFORM = "PLATFORM",
}

export enum ParticipationConstraint {
  EVERYONE = "EVERYONE",
  PREMIUM = "PREMIUM",
  REFERENCE = "REFERENCE",
  FOLLOWER = "FOLLOWER",
  ROLE = "ROLE",
}

export enum ParticipationStatus {
  JOINED = "JOINED",
  ASIL_PENDING = "ASIL_PENDING",
  ASIL_APPROVED = "ASIL_APPROVED",
  ASIL_EXPIRED = "ASIL_EXPIRED",
  YEDEK_WAITING = "YEDEK_WAITING",
  YEDEK_PROMOTED = "YEDEK_PROMOTED",
  WON = "WON",
  LOST = "LOST",
}

/* ---------- Core Models ---------- */

export interface Raffle {
  id: string;
  title: string;
  description?: string | null;
  type: RaffleType; 
  status: RaffleStatus;

  startDate: string;
  endDate: string;

  constraint: ParticipationConstraint; 
  //   allowedRoles: string[]; // ! Bu bana lazım değil

  currencyId: number; 
  totalCost: string; 

  epCost?: number | null;
  couponType?: string | null;

  //   maxWinners: number;  // ! Bu bana lazım değil
  //   backupWinnerCount: number; // ! Bu bana lazım değil

  creatorType: CreatorType;
  creatorId: string;
  creator: {
    name: string;
    image: string;
  }; // ! bu backende eklenmeli

  drawDate?: string | null; // TODO : süre hesabında kullanılacak
  announceDate?: string | null;
  createdAt: string;
  updatedAt: string;

  rewards?: RaffleReward[];
  participations?: Participation[];
  pool?: RafflePool[];
  // logs?: RaffleLog[]; // ! Bu bana lazım değil

  participationCount: number; // ! bu backende eklenmeli
  productCount: number; // ! bu backende eklenmeli
  categoryCount: number; // ! bu backende eklenmeli

}

export interface RaffleReward {
  id: string;
  raffleId: string;
  name: string;
  quantity: number;
  image?: string | null;
  value?: string | null;

  productId?: string | null;
  offerId?: string | null;
}

export interface RafflePool {
  id: string;
  raffleId: string;
  offerId: string;
  stockId: number;

  winnerId?: string | null;
  claimedAt?: string | null;

  createdAt: string;
}

export interface Participation {
  id: string;
  raffleId: string;
  userId: string;

  ticketNumber: number;
  status: ParticipationStatus;

  costType: RaffleType;
  costValue?: number | null;
  couponCode?: string | null;

  joinedAt: string;
  ipAddress?: string | null;

  approvedAt?: string | null;
  lastViewedAt?: string | null;
}
