import { SearchItem } from '@/components/layout/Header/types/search.types';

export const MOCK_SEARCH_DATA: SearchItem[] = [
  // ─── PC Oyunları ───
  {
    id: '1',
    title: 'Elden Ring: Shadow of the Erdtree',
    category: 'PC > Action RPG',
    price: 1299,
    image: '',
  },
  {
    id: '2',
    title: 'Baldur\'s Gate 3',
    category: 'PC > RPG',
    price: 1499,
    image: '',
  },
  {
    id: '3',
    title: 'Counter-Strike 2 - Prime Status',
    category: 'PC > FPS',
    price: 299,
    image: '',
  },
  {
    id: '4',
    title: 'Cyberpunk 2077: Phantom Liberty',
    category: 'PC > Action RPG',
    price: 899,
    image: '',
  },
  {
    id: '5',
    title: 'The Witcher 3: Wild Hunt - Next Gen',
    category: 'PC > RPG',
    price: 699,
    image: '',
  },
  {
    id: '6',
    title: 'Starfield',
    category: 'PC > Action RPG',
    price: 1299,
    image: '',
  },
  {
    id: '7',
    title: 'Diablo IV',
    category: 'PC > Action RPG',
    price: 1199,
    image: '',
  },
  {
    id: '8',
    title: 'Dota 2 - Battle Pass',
    category: 'PC > MOBA',
    price: 149,
    image: '',
  },
  {
    id: '9',
    title: 'Valorant - VP 15000',
    category: 'PC > FPS',
    price: 2499,
    image: '',
  },
  {
    id: '10',
    title: 'League of Legends - RP 15000',
    category: 'PC > MOBA',
    price: 2499,
    image: '',
  },

  // ─── PlayStation ───
  {
    id: '11',
    title: 'God of War: Ragnarök',
    category: 'PlayStation > Action Adventure',
    price: 1499,
    image: '',
  },
  {
    id: '12',
    title: 'Spider-Man 2',
    category: 'PlayStation > Action Adventure',
    price: 1799,
    image: '',
  },
  {
    id: '13',
    title: 'Final Fantasy VII Rebirth',
    category: 'PlayStation > RPG',
    price: 1599,
    image: '',
  },
  {
    id: '14',
    title: 'Resident Evil 4 Remake',
    category: 'PlayStation > Horror',
    price: 999,
    image: '',
  },
  {
    id: '15',
    title: 'Gran Turismo 7',
    category: 'PlayStation > Racing',
    price: 1299,
    image: '',
  },
  {
    id: '16',
    title: 'PS Plus - 3 Aylık Abonelik',
    category: 'PlayStation > Abonelik',
    price: 499,
    image: '',
  },

  // ─── Xbox ───
  {
    id: '17',
    title: 'Forza Horizon 5 - Premium Edition',
    category: 'Xbox > Racing',
    price: 1799,
    image: '',
  },
  {
    id: '18',
    title: 'Halo Infinite - Campaign',
    category: 'Xbox > FPS',
    price: 999,
    image: '',
  },
  {
    id: '19',
    title: 'Xbox Game Pass Ultimate - 3 Ay',
    category: 'Xbox > Abonelik',
    price: 549,
    image: '',
  },
  {
    id: '20',
    title: 'Starfield - Xbox Series X',
    category: 'Xbox > Action RPG',
    price: 1299,
    image: '',
  },

  // ─── Nintendo Switch ───
  {
    id: '21',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    category: 'Nintendo > Adventure',
    price: 1799,
    image: '',
  },
  {
    id: '22',
    title: 'Mario Kart 8 Deluxe',
    category: 'Nintendo > Racing',
    price: 1499,
    image: '',
  },
  {
    id: '23',
    title: 'Super Smash Bros. Ultimate',
    category: 'Nintendo > Fighting',
    price: 1299,
    image: '',
  },
  {
    id: '24',
    title: 'Animal Crossing: New Horizons',
    category: 'Nintendo > Simulation',
    price: 1199,
    image: '',
  },

  // ─── Mobile ───
  {
    id: '25',
    title: 'Genshin Impact - Welkin Moon',
    category: 'Mobile > RPG',
    price: 99,
    image: '',
  },
  {
    id: '26',
    title: 'PUBG Mobile - UC 6000',
    category: 'Mobile > Battle Royale',
    price: 999,
    image: '',
  },
  {
    id: '27',
    title: 'Free Fire - Diamond 3000',
    category: 'Mobile > Battle Royale',
    price: 499,
    image: '',
  },

  // ─── Aksesuar ───
  {
    id: '28',
    title: 'Razer DeathAdter V3 Pro Mouse',
    category: 'Aksesuar > Mouse',
    price: 2990,
    image: '',
  },
  {
    id: '29',
    title: 'Logitech G Pro X Keyboard',
    category: 'Aksesuar > Keyboard',
    price: 3490,
    image: '',
  },
  {
    id: '30',
    title: 'Sony DualSense Controller',
    category: 'Aksesuar > Controller',
    price: 1899,
    image: '',
  },
  {
    id: '31',
    title: 'Xbox Wireless Controller',
    category: 'Aksesuar > Controller',
    price: 1699,
    image: '',
  },
  {
    id: '32',
    title: 'HyperX Cloud Stinger 2 Headset',
    category: 'Aksesuar > Kulaklık',
    price: 2290,
    image: '',
  },

  // ─── Gift Card ───
  {
    id: '33',
    title: 'Steam Wallet - 100₺',
    category: 'Gift Card > Steam',
    price: 100,
    image: '',
  },
  {
    id: '34',
    title: 'Steam Wallet - 250₺',
    category: 'Gift Card > Steam',
    price: 250,
    image: '',
  },
  {
    id: '35',
    title: 'PlayStation Store - 500₺',
    category: 'Gift Card > PlayStation',
    price: 500,
    image: '',
  },
  {
    id: '36',
    title: 'Xbox Gift Card - 250₺',
    category: 'Gift Card > Xbox',
    price: 250,
    image: '',
  },
  {
    id: '37',
    title: 'Nintendo eShop - 200₺',
    category: 'Gift Card > Nintendo',
    price: 200,
    image: '',
  },
];

