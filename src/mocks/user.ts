// lib/mockDb.ts
//
// Mock backend simülasyonu için kullanıcı veritabanı.
// Firebase token'ı decode edip ilgili kullanıcı datasını döner.

export interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin' | 'store';
  createdAt: string;
}

// Mock kullanıcılar — Firebase'de kayıtlı email'ler ile eşleşmeli
const MOCK_USERS: Record<string, MockUser> = {
  'test@epinpay.com': {
    uid: 'mock-uid-001',
    email: 'test@epinpay.com',
    displayName: 'Test User',
    role: 'user',
    createdAt: '2024-01-01T00:00:00Z',
  },
  'macit.furkan.erkaya@gmail.com': {
    uid: 'mock-uid-002',
    email: 'macit.furkan.erkaya@gmail.com',
    displayName: 'Macit Furkan Erkaya',
    role: 'admin',
    createdAt: '2024-01-15T00:00:00Z',
  },
  'admin@epinpay.com': {
    uid: 'mock-uid-003',
    email: 'admin@epinpay.com',
    displayName: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  'store@epinpay.com': {
    uid: 'mock-uid-004',
    email: 'store@epinpay.com',
    displayName: 'Store User',
    role: 'store',
    createdAt: '2024-02-01T00:00:00Z',
  },
  'volgaaytac@gmail.com': {
    uid: 'mock-uid-005',
    email: 'volgaaytac@gmail.com',
    displayName: 'Volga Aytac',
    role: 'user',
    createdAt: '2024-03-01T00:00:00Z',
  },
};

/**
 * Firebase token'dan email'i çıkarır (basit decode, production'da jwt.verify kullan).
 * Bu mock versiyonda token'ı olduğu gibi email olarak kabul ediyoruz.
 */
export function getUserFromFirebaseToken(firebaseToken: string): MockUser | null {
  // Gerçek projede: jwt.verify(firebaseToken, ...) ile email çıkarılır
  // Mock için: token'ı direkt email olarak kullanıyoruz
  return MOCK_USERS[firebaseToken] ?? null;
}

/**
 * Mock backend session token'ı üretir (JWT benzeri 3 parçalı yapı).
 * Middleware'in decode edebilmesi için Header.Payload.Signature formatında döner.
 */
export function generateMockSessionToken(user: MockUser): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    uid: user.uid,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 saat
    iat: Math.floor(Date.now() / 1000)
  }));
  const signature = 'mock-signature';
  
  return `${header}.${payload}.${signature}`;
}