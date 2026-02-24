// app/api/auth/login/route.ts
//
// Firebase token'ı alır, mock kullanıcı datasını döner.
// Gerçek projede: token verify edilir, DB'den user çekilir, JWT session token üretilir.

import { NextRequest, NextResponse } from 'next/server';
import { getUserFromFirebaseToken, generateMockSessionToken } from '@/mocks/user';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body.email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Geçersiz istek formatı.' },
        { status: 400 }
      );
    }

    const { email, firebaseToken } = body;

    // Yapay gecikme (loading state test için)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock: email ile user datası bul
    // Gerçek projede: firebaseToken verify edilir, içinden uid çıkarılır,
    // DB'den user çekilir
    const user = getUserFromFirebaseToken(email);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı.' },
        { status: 404 }
      );
    }

    // Mock session token üret
    const sessionToken = generateMockSessionToken(user);

    return NextResponse.json(
      {
        success: true,
        message: 'Giriş başarılı.',
        token: sessionToken,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[login] Unexpected error:', error);
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası.' },
      { status: 500 }
    );
  }
}