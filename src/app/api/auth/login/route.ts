import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    const FIREBASE_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    const AUTH_SERVICE_URL = "http://localhost:3001"; 
    const USER_SERVICE_URL = "http://localhost:3009";

    // 1. ADIM: Firebase
    const firebaseRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    const firebaseData = await firebaseRes.json();
    if (!firebaseRes.ok) {
      return NextResponse.json({ message: 'Firebase Hatası: ' + (firebaseData.error?.message || 'Giriş başarısız') }, { status: 401 });
    }

    const idToken = firebaseData.idToken;

    // 2. ADIM: Auth Service (3001) - Hata Kontrollü
    try {
      const authBackendRes = await fetch(`${AUTH_SERVICE_URL}/api/public/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      // Eğer 3001 çalışmıyorsa veya yanıt dönmüyorsa burası catch'e düşer
    } catch (e) {
      console.error("3001 Portuna erişilemedi!");
    }

    // 3. ADIM: User Service (3009) - Detaylı Kontrol
    const userProfileRes = await fetch(`${USER_SERVICE_URL}/api/me/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    });

    // Eğer 3009 JSON yerine hata sayfası (HTML) dönerse res.json() patlar. Bunu engelliyoruz:
    const contentType = userProfileRes.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textError = await userProfileRes.text();
      console.error("3009 JSON dönmedi, dönen veri:", textError);
      return NextResponse.json({ message: "User Service (3009) geçersiz yanıt döndü." }, { status: 502 });
    }

    const userProfileData = await userProfileRes.json();

    // 4. ADIM: Başarılı Yanıt Yapısı (Senin .data beklentine uygun)
    const response = NextResponse.json({
      success: true,
      data: {
        user: userProfileData.data || userProfileData, 
        token: idToken
      }
    });

    response.cookies.set('session_token', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("API ROUTE KRİTİK HATA:", error.message);
    return NextResponse.json({ message: 'Sunucu hatası: ' + error.message }, { status: 500 });
  }
}