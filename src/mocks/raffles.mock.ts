import {
  Raffle,
  RaffleType,
  RaffleStatus,
  CreatorType,
  ParticipationConstraint,
} from "@/components/common/Cards/RaffleCard/types";
import { Winner } from "@/features/raffles/raffle.types";
import { FAQ } from "@/types/types";

export const rafflesMockData: Raffle[] = [
  // PREMIUM
  {
    id: "raffle-001",
    title: "Pubg Mobile 660 UC Çekilişi",
    type: RaffleType.FREE,
    status: RaffleStatus.ACTIVE,
    startDate: "2025-03-01T10:00:00Z",
    endDate: "2025-03-15T23:59:00Z",
    currencyId: 1,
    totalCost: "0.00",
    creatorType: CreatorType.PLATFORM,
    creatorId: "1",
    creator: {
      name: "Epinpay",
      image: "/logos/logo-circle.webp",
    },
    createdAt: "2025-02-20T08:00:00Z",
    updatedAt: "2025-03-01T10:00:00Z",
    rewards: [
      {
        id: "99",
        raffleId: "raffle-001",
        name: "PUBG Mobile 660 UC TR",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-660-uc-tr-38.webp",
        offerId: "offer-101",
      },
    ],
    constraint: ParticipationConstraint.PREMIUM,
    participationCount: 1289,
    productCount: 10,
    categoryCount: 1,
  },
  {
    id: "raffle-002",
    title: "Pubg Mobile UC Çekilişi",
    type: RaffleType.EP,
    status: RaffleStatus.ACTIVE,
    startDate: "2025-03-05T12:00:00Z",
    endDate: "2025-03-20T20:00:00Z",
    currencyId: 4,
    totalCost: "500.00",
    creatorType: CreatorType.PLATFORM,
    creatorId: "1",
    creator: {
      name: "Epinpay",
      image: "/logos/logo-circle.webp",
    },
    createdAt: "2025-02-28T09:00:00Z",
    updatedAt: "2025-03-05T12:00:00Z",
    rewards: [
      {
        id: "reward-002",
        raffleId: "raffle-002",
        name: "PUBG Mobile 1800 UC TR",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-1800-uc-tr-36.webp",
        offerId: "offer-102",
      },
      {
        id: "reward-012",
        raffleId: "raffle-002",
        name: "PUBG Mobile 3850 UC TR",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-3850-uc-tr-24.webp",
        offerId: "offer-102",
      },
      {
        id: "reward-022",
        raffleId: "raffle-002",
        name: "PUBG Mobile 8100 UC TR",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-8100-uc-tr-92.webp",
        offerId: "offer-102",
      },
    ],
    constraint: ParticipationConstraint.PREMIUM,
    participationCount: 1289,
    productCount: 30,
    categoryCount: 1,
  },
  {
    id: "raffle-003",
    title: "League of Legends RP",
    type: RaffleType.COUPON,
    status: RaffleStatus.ANNOUNCED,
    startDate: "2025-02-10T10:00:00Z",
    endDate: "2025-02-25T23:59:00Z",
    currencyId: 1,
    totalCost: "0.00",
    creatorType: CreatorType.PUBLISHER,
    creatorId: "101",
    creator: {
      name: "İLKİNSAN",
      image:
        "https://cdn.epinpay.com/image/ep/2025/10/mainpage/ilkinsan-38.webp",
    },
    createdAt: "2025-02-05T11:00:00Z",
    updatedAt: "2025-02-26T08:00:00Z",
    rewards: [
      {
        id: "reward-003",
        raffleId: "raffle-003",
        name: "1005 League of Legends RP",
        quantity: 5,
        image:
          "https://cdn.epinpay.com/image/ep/2025/10/product/1005-league-of-legends-rp-23.webp",
        offerId: "offer-103",
      },
    ],
    constraint: ParticipationConstraint.PREMIUM,
    participationCount: 1289,
    productCount: 5,
    categoryCount: 1,
  },
  {
    id: "raffle-004",
    title: "Pubg Mobile 60 UC Top-Up",
    type: RaffleType.EP,
    status: RaffleStatus.COMPLETED,
    startDate: "2025-01-01T00:00:00Z",
    endDate: "2025-01-14T23:59:00Z",
    currencyId: 4,
    totalCost: "750.00",
    creatorType: CreatorType.PUBLISHER,
    creatorId: "106",
    creator: {
      name: "SEYDICAN",
      image:
        "https://cdn.epinpay.com/image/ep/2025/10/mainpage/seydican-53.webp",
    },
    createdAt: "2024-12-28T10:00:00Z",
    updatedAt: "2025-01-15T12:00:00Z",
    rewards: [
      {
        id: "reward-004",
        raffleId: "raffle-004",
        name: "Pubg Mobile 60 UC Top-Up",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/10/product/pubg-mobile-60-uc-top-up-26.webp",
        offerId: "offer-104",
      },
    ],
    constraint: ParticipationConstraint.PREMIUM,
    participationCount: 1289,
    productCount: 10,
    categoryCount: 1,
  },
  {
    id: "raffle-005",
    title: "Steam Cüzdan Kodu",
    type: RaffleType.FREE,
    status: RaffleStatus.DRAWING,
    startDate: "2025-03-01T08:00:00Z",
    endDate: "2025-03-10T20:00:00Z",
    currencyId: 1,
    totalCost: "0.00",
    creatorType: CreatorType.PLATFORM,
    creatorId: "1",
    creator: {
      name: "Epinpay",
      image: "/logos/logo-circle.webp",
    },
    createdAt: "2025-02-22T09:00:00Z",
    updatedAt: "2025-03-10T20:01:00Z",
    rewards: [
      {
        id: "reward-005",
        raffleId: "raffle-505",
        name: "5 USD Steam Cüzdan Kodu",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/3/product/5-usd-steam-cuzdan-kodu-37.webp",
        offerId: "offer-105",
      },
      {
        id: "reward-00545",
        raffleId: "raffle-605",
        name: "75 USD Steam Cüzdan Kodu",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/3/product/75-usd-steam-cuzdan-kodu-66.webp",
        offerId: "offer-105",
      },
      {
        id: "reward-00567",
        raffleId: "raffle-705",
        name: "100 USD Steam Cüzdan Kodu",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/3/product/100-usd-steam-cuzdan-kodu-17.webp",
        offerId: "offer-105",
      },
    ],
    constraint: ParticipationConstraint.PREMIUM,
    participationCount: 1289,
    productCount: 10,
    categoryCount: 1,
  },

  // REFERANS
  {
    id: "raffle-006",
    title: "Metin2 EP (Ejder Parası) Bundle",
    type: RaffleType.MIXED,
    status: RaffleStatus.ACTIVE,
    startDate: "2025-03-08T14:00:00Z",
    endDate: "2025-03-22T22:00:00Z",
    currencyId: 1,
    totalCost: "250.00",
    creatorType: CreatorType.PUBLISHER,
    creatorId: "101",
    creator: {
      name: "İLKİNSAN",
      image:
        "https://cdn.epinpay.com/image/ep/2025/10/mainpage/ilkinsan-38.webp",
    },
    createdAt: "2025-03-06T10:00:00Z",
    updatedAt: "2025-03-08T14:00:00Z",
    rewards: [
      {
        id: "reward-126",
        raffleId: "raffle-006",
        name: "Gameforge 1000 TRY E-Pin – Metin2 4800 EP",
        quantity: 20,
        image:
          "https://cdn.epinpay.com/image/ep/2025/7/product/gameforge-1000-try-e-pin-metin2-4800-ep-6.webp?width=300/height=300/format=webp",
        offerId: "offer-106",
      },
      {
        id: "reward-136",
        raffleId: "raffle-006",
        name: "Metin2 2100 EP",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/7/product/gameforge-500-try-e-pin-metin2-2100-ep-48.webp?width=300/height=300/format=webp",
        offerId: "offer-106",
      },
      {
        id: "reward-006",
        raffleId: "raffle-006",
        name: "Metin2 Dragon 30 Gün Oyun Süresi",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/5/product/metin2-dragon-30-gun-oyun-suresi-38.webp?width=300/height=300/format=webp",
        offerId: "offer-106",
      },
    ],
    constraint: ParticipationConstraint.REFERENCE,
    participationCount: 1289,
    productCount: 40,
    categoryCount: 3,
  },
  {
    id: "raffle-007",
    title: "Valorant Paketi",
    type: RaffleType.EP,
    status: RaffleStatus.DRAFT,
    startDate: "2025-03-25T10:00:00Z",
    endDate: "2025-04-05T23:59:00Z",
    currencyId: 4,
    totalCost: "300.00",
    creatorType: CreatorType.PUBLISHER,
    creatorId: "102",
    creator: {
      name: "BERKAYKURT7",
      image:
        "https://cdn.epinpay.com/image/ep/2026/1/mainpage/berkaykurt7-27.webp",
    },
    createdAt: "2025-03-04T11:00:00Z",
    updatedAt: "2025-03-04T11:00:00Z",
    rewards: [
      {
        id: "reward-007",
        raffleId: "raffle-0071",
        name: "Valorant 375 VP",
        quantity: 5,
        image:
          "https://cdn.epinpay.com/image/ep/2025/10/product/valorant-375-vp-6.webp?width=300/height=300/format=webp",
        offerId: "offer-107",
      },
      {
        id: "reward-0072",
        raffleId: "raffle-007",
        name: "Valorant 825 VP",
        quantity: 5,
        image:
          "https://cdn.epinpay.com/image/ep/2025/10/product/valorant-825-vp-33.webp?width=300/height=300/format=webp",
        offerId: "offer-107",
      },
      {
        id: "reward-0073",
        raffleId: "raffle-007",
        name: "Valorant 2925 VP",
        quantity: 5,
        image:
          "https://cdn.epinpay.com/image/ep/2025/10/product/valorant-2925-vp-5.webp?width=300/height=300/format=webp",
        offerId: "offer-107",
      },
    ],
    constraint: ParticipationConstraint.REFERENCE,
    participationCount: 1289,
    productCount: 15,
    categoryCount: 1,
  },
  {
    id: "raffle-008",
    title: "16.250 Zula Altın ZA Çekilişi",
    type: RaffleType.FREE,
    status: RaffleStatus.ACTIVE,
    startDate: "2025-03-03T09:00:00Z",
    endDate: "2025-03-31T23:59:00Z",
    currencyId: 1,
    totalCost: "0.00",
    creatorType: CreatorType.PUBLISHER,
    creatorId: "103",
    creator: {
      name: "DGRMURAT",
      image:
        "https://cdn.epinpay.com/image/ep/2025/8/mainpage/dgrmurat-65.webp",
    },
    createdAt: "2025-03-01T10:00:00Z",
    updatedAt: "2025-03-03T09:00:00Z",
    rewards: [
      {
        id: "reward-008",
        raffleId: "raffle-008",
        name: "16.250 Zula Altın ZA",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/2/product/16250-zula-altin-za-14.webp?width=300/height=300/format=webp",
        offerId: "offer-108",
      },
    ],
    constraint: ParticipationConstraint.REFERENCE,
    participationCount: 1289,
    productCount: 10,
    categoryCount: 1,
  },
  {
    id: "raffle-009",
    title: "DRAGON BALL FighterZ",
    type: RaffleType.COUPON,
    status: RaffleStatus.ANNOUNCED,
    startDate: "2025-02-14T10:00:00Z",
    endDate: "2025-02-28T23:59:00Z",
    currencyId: 1,
    totalCost: "0.00",
    creatorType: CreatorType.PUBLISHER,
    creatorId: "104",
    creator: {
      name: "MAGLOR",
      image: "https://cdn.epinpay.com/image/ep/2025/8/mainpage/maglor-22.webp",
    },
    createdAt: "2025-02-10T08:00:00Z",
    updatedAt: "2025-03-01T09:00:00Z",
    rewards: [
      {
        id: "reward-009",
        raffleId: "raffle-009",
        name: "DRAGON BALL FighterZ - FighterZ Pass 2 (Xbox One) - Xbox Live Key - GLOBAL",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/3/product/dragon-ball-fighterz-fighterz-pass-2-xbox-one-xbox-live-key-global-2.webp?width=300/height=300/format=webp",
        offerId: "offer-109",
      },
    ],
    constraint: ParticipationConstraint.REFERENCE,
    participationCount: 1289,
    productCount: 10,
    categoryCount: 1,
  },
  {
    id: "raffle-010",
    title: "Rise Online World Çekilişi",
    type: RaffleType.EP,
    status: RaffleStatus.ACTIVE,
    startDate: "2025-03-07T12:00:00Z",
    endDate: "2025-03-18T20:00:00Z",
    currencyId: 4,
    totalCost: "400.00",
    creatorType: CreatorType.PUBLISHER,
    creatorId: "105",
    creator: {
      name: "SAVASBERKE",
      image:
        "https://cdn.epinpay.com/image/ep/2025/9/mainpage/savas-berke-18.webp",
    },
    createdAt: "2025-03-04T14:00:00Z",
    updatedAt: "2025-03-07T12:00:00Z",
    rewards: [
      {
        id: "reward-010",
        raffleId: "raffle-010",
        name: "Rise Online World 4000 + 140 Cash",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/5/product/rise-online-world-4000-140-cash-1.webp?width=300/height=300/format=webp",
        offerId: "offer-110",
      },
    ],
    constraint: ParticipationConstraint.REFERENCE,
    participationCount: 1289,
    productCount: 10,
    categoryCount: 1,
  },

  // EPİNPAY
  {
    id: "raffle-011",
    title: "LOL & Pubg Bundle",
    type: RaffleType.FREE,
    status: RaffleStatus.CANCELLED,
    startDate: "2025-01-20T10:00:00Z",
    endDate: "2025-02-03T23:59:00Z",
    currencyId: 1,
    totalCost: "0.00",
    creatorType: CreatorType.PLATFORM,
    creatorId: "1",
    creator: {
      name: "Epinpay",
      image: "/logos/logo-circle.webp",
    },
    createdAt: "2025-01-18T09:00:00Z",
    updatedAt: "2025-02-04T11:00:00Z",
    rewards: [
      {
        id: "reward-004",
        raffleId: "raffle-011",
        name: "Pubg Mobile 60 UC Top-Up",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/10/product/pubg-mobile-60-uc-top-up-26.webp",
        offerId: "offer-104",
      },
      {
        id: "reward-003",
        raffleId: "raffle-011",
        name: "1005 League of Legends RP",
        quantity: 5,
        image:
          "https://cdn.epinpay.com/image/ep/2025/10/product/1005-league-of-legends-rp-23.webp",
        offerId: "offer-103",
      },
    ],
    constraint: ParticipationConstraint.EVERYONE,
    participationCount: 1289,
    productCount: 20,
    categoryCount: 2,
  },
  {
    id: "raffle-012",
    title: "Nowa Online World Elmas",
    type: RaffleType.MIXED,
    status: RaffleStatus.DRAWN,
    startDate: "2025-02-20T10:00:00Z",
    endDate: "2025-03-02T23:59:00Z",
    currencyId: 1,
    totalCost: "150.00",
    creatorType: CreatorType.PLATFORM,
    creatorId: "1",
    creator: {
      name: "Epinpay",
      image: "/logos/logo-circle.webp",
    },
    createdAt: "2025-02-17T10:00:00Z",
    updatedAt: "2025-03-03T08:00:00Z",
    rewards: [
      {
        id: "reward-012",
        raffleId: "raffle-012",
        name: "Nowa Online World 2000 Elmas",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/3/product/nowa-online-world-2000-elmas-59.webp?width=300/height=300/format=webp",
        offerId: "offer-112",
      },
    ],
    constraint: ParticipationConstraint.REFERENCE,
    participationCount: 1289,
    productCount: 10,
    categoryCount: 1,
  },
  {
    id: "raffle-013",
    title: "Joypara JP",
    type: RaffleType.EP,
    status: RaffleStatus.ACTIVE,
    startDate: "2025-03-09T10:00:00Z",
    endDate: "2025-03-24T20:00:00Z",
    currencyId: 4,
    totalCost: "600.00",
    creatorType: CreatorType.PLATFORM,
    creatorId: "1",
    creator: {
      name: "Epinpay",
      image: "/logos/logo-circle.webp",
    },
    createdAt: "2025-03-07T09:00:00Z",
    updatedAt: "2025-03-09T10:00:00Z",
    rewards: [
      {
        id: "reward-01312",
        raffleId: "raffle-013",
        name: "1.000 Joypara",
        quantity: 5,
        image:
          "https://cdn.epinpay.com/image/ep/2025/3/product/1000-joypara-32.webp?width=300/height=300/format=webp",
        offerId: "offer-113",
      },
      {
        id: "reward-01323",
        raffleId: "raffle-013",
        name: "12.750 Joypara",
        quantity: 5,
        image:
          "https://cdn.epinpay.com/image/ep/2025/3/product/12750-joypara-95.webp?width=300/height=300/format=webp",
        offerId: "offer-113",
      },
    ],
    constraint: ParticipationConstraint.REFERENCE,
    participationCount: 1289,
    productCount: 10,
    categoryCount: 1,
  },
  {
    id: "raffle-014",
    title: "Knight Online",
    type: RaffleType.COUPON,
    status: RaffleStatus.ACTIVE,
    startDate: "2025-03-06T09:00:00Z",
    endDate: "2025-03-19T23:59:00Z",
    currencyId: 2,
    totalCost: "0.00",
    creatorType: CreatorType.PLATFORM,
    creatorId: "1",
    creator: {
      name: "Epinpay",
      image: "/logos/logo-circle.webp",
    },
    createdAt: "2025-03-04T08:00:00Z",
    updatedAt: "2025-03-06T09:00:00Z",
    rewards: [
      {
        id: "reward-01412",
        raffleId: "raffle-01411",
        name: "Knight Online 2000 Cash",
        quantity: 8,
        image:
          "https://cdn.epinpay.com/image/ep/2025/3/product/knight-online-2000-cash-67.webp?width=300/height=300/format=webp",
        offerId: "offer-114",
      },
      {
        id: "reward-01434",
        raffleId: "raffle-01423",
        name: "Knight Online 2400 Cash",
        quantity: 8,
        image:
          "https://cdn.epinpay.com/image/ep/2025/3/product/knight-online-2400-cash-71.webp?width=300/height=300/format=webp",
        offerId: "offer-114",
      },
    ],
    constraint: ParticipationConstraint.REFERENCE,
    participationCount: 1289,
    productCount: 10,
    categoryCount: 2,
  },
  {
    id: "raffle-015",
    title: "Honor of Kings",
    type: RaffleType.FREE,
    status: RaffleStatus.ACTIVE,
    startDate: "2025-03-10T11:00:00Z",
    endDate: "2025-03-25T22:00:00Z",
    currencyId: 1,
    totalCost: "0.00",
    creatorType: CreatorType.PLATFORM,
    creatorId: "1",
    creator: {
      name: "Epinpay",
      image: "/logos/logo-circle.webp",
    },
    createdAt: "2025-03-08T10:00:00Z",
    updatedAt: "2025-03-10T11:00:00Z",
    rewards: [
      {
        id: "reward-015",
        raffleId: "raffle-015",
        name: "Honor of Kings 80 Tokens",
        quantity: 10,
        image:
          "https://cdn.epinpay.com/image/ep/2025/10/product/honor-of-kings-80-tokens-4.webp?width=300/height=300/format=webp",
        offerId: "offer-115",
      },
    ],
    constraint: ParticipationConstraint.REFERENCE,
    participationCount: 1289,
    productCount: 10,
    categoryCount: 1,
  },
];

export const rafflesFaqMockData: FAQ[] = [
  {
    id: 1,
    name: "How do I enter a raffle?",
    description:
      "To enter a raffle, simply navigate to the active raffle on the Raffles page and click the 'Enter Raffle' button. You must be logged in to participate. Each raffle may have different entry requirements, such as a minimum account age or a specific number of points.",
  },
  {
    id: 2,
    name: "How are winners selected?",
    description:
      "Winners are selected randomly and fairly using a certified random number generator once the raffle period ends. Every eligible entry has an equal chance of winning. The draw is automated and cannot be influenced by any party.",
  },
  {
    id: 3,
    name: "How will I be notified if I win?",
    description:
      "If you are selected as a winner, you will receive an instant notification via the platform and an email to your registered address. You have 48 hours to claim your prize before it is forfeited and a new winner is drawn.",
  },
  {
    id: 4,
    name: "Can I enter the same raffle multiple times?",
    description:
      "No, each user is limited to one entry per raffle to ensure fairness for all participants. Attempts to create multiple accounts to gain extra entries will result in disqualification and a permanent account ban.",
  },
  {
    id: 5,
    name: "What happens if I don't claim my prize?",
    description:
      "Unclaimed prizes expire after 48 hours of the winner announcement. Once expired, a re-draw is conducted automatically and a new winner is selected from the remaining eligible entries. Make sure your notification settings are enabled so you never miss a win.",
  },
];

export const rafflesWinnersMockData: Winner[] = [
  {
    name: "Jane D***",
    date: "2025-06-13T11:48:00.000Z",
    id: "001",
  },
  {
    name: "Marcus T***",
    date: "2025-06-12T09:22:00.000Z",
    id: "002",
  },
  {
    name: "Sofia R***",
    date: "2025-06-11T14:05:00.000Z",
    id: "003",
  },
  {
    name: "Ahmed K***",
    date: "2025-06-10T16:33:00.000Z",
    id: "004",
  },
  {
    name: "Priya M***",
    date: "2025-06-09T08:17:00.000Z",
    id: "005",
  },
  {
    name: "Lucas B***",
    date: "2025-06-08T20:44:00.000Z",
    id: "006",
  },
  {
    name: "Elena V***",
    date: "2025-06-07T13:59:00.000Z",
    id: "007",
  },
  {
    name: "Omar S***",
    date: "2025-06-06T10:30:00.000Z",
    id: "008",
  },
];
